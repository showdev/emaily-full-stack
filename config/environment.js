const env = process.env.NODE_ENV || 'development'
const port = 5000

if (env === 'development') {
  process.env.PORT = port
  process.env.MONGODB_URI = 'mongodb://localhost:27017/emaily-dev'
  process.env.STRIPE_SECRET_KEY = 'sk_test_Mj1QywXQJyzqermsuFQ9vJAq'
  process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_iJP158vWh0OSc6HNCoJNIzQP'
} else if (env === 'test') {
  process.env.PORT = port
  process.env.MONGODB_URI = 'mongodb://localhost:27017/emaily-test'
}

