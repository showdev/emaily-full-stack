const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const { requireLogin } = require('../middlewares/require-login')
const { requireCredits } = require('../middlewares/require-credits')
const Mailer = require('../services/mailer')
const surveyTmplate = require('../services/email-templates/survey-template')

const Survey = mongoose.model('survey')

exports.surveyRoutes = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    })

    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')

    const events = _.chain(req.body)

      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname)

        if (match) {
          const { surveyId, choice } = match
          return { email, surveyId, choice }
        }
      })

      .compact()
      .uniqBy('email', 'surveyId')
      .forEach(({ surveyId, choice, email }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec()
      })
      .value()

    res.send({})
  })

  app.post('/api/surveys', requireCredits, requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    })
    try {
      const mailer = new Mailer(survey, surveyTmplate(survey))
      await mailer.send()
      await survey.save()

      req.user.credits -= 1
      await req.user.save()

      res.send(req.user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
