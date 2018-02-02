const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
console.log('Database connected successfully  on ', process.env.MONGODB_URI)

module.exports = { mongoose }
