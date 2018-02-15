const mongoose = require('mongoose')
const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const {
  googleClientID,
  googleClientSecret,
  facebookAppId,
  facebookAppSecret,
} = require('../config/keys')

const User = mongoose.model('user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  let user

  try {
    user = await User.findById(id)
  } catch (error) {
    console.log('Error finding user with id ', id, error)
  }

  if (user) {
    done(null, user)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }

      try {
        const newUser = await new User({ googleId: profile.id }).save()
        done(null, newUser)
      } catch (error) {
        console.log('ERROR', error)
      }
    }
  )
)
