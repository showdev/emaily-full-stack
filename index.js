const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./config/environment')
require('./services/mongoose')
require('./models/user')
require('./models/survey')
require('./services/passport')

const { authRoutes } = require('./routes/auth-routes')
const { billingRoutes } = require('./routes/billing-routes')
const { surveyRoutes } = require('./routes/survey-routes')

const { cookieKey } = require('./config/keys')

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)
billingRoutes(app)
surveyRoutes(app)

if (process.env.NODE_ENV || 'production') {
  // Express will serve up production assets
  // lie our main.js file, or main.css file!
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
  // Express will serve up the index.html file
  // if it doesn't recognize the route
}

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`)
})
