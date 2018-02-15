const { stripeSecretKey } = require('../config/keys')
const { requireLogin } = require('../middlewares/require-login')
const stripe = require('stripe')(stripeSecretKey)
const User = require('../models/user')

const billingRoutes = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    console.log('Hello')

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id, // obtained with Stripe.js
      description: '$5 for 5 credits',
    })

    req.user.credits += 5

    const user = await req.user.save()

    res.send(user)
  })
}

module.exports = { billingRoutes }
