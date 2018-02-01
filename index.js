const express = require('express')
const bodyParser = require('body-parser')

const { authRoutes } = require('./routes/auth-routes')

require('./services/passport')

const app = express()

app.use(bodyParser.json())

authRoutes(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`)
})

