const env = process.env.NODE_ENV || 'development'
const port = 5000

if (env === 'development') {
  process.env.PORT = port
  process.env.MONGODB_URI = 'mongodb://localhost:27017/emaily-dev'
} else if (env === 'test') {
  process.env.PORT = port
  process.env.MONGODB_URI = 'mongodb://localhost:27017/emaily-test'
}

