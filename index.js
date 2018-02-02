const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./config/environment')
require('./services/mongoose')
require('./models/user')
require('./services/passport')

const { authRoutes } = require('./routes/auth-routes')
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

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`)
})
