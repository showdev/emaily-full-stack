const express = require('express')
const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send({"HI": "THERE"})
})

app.listen(port || 5000)
