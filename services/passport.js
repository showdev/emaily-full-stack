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
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        done(null, existingUser)
        return
      }

      try {
        const newUser = await new User({ googleId: profile.id }).save()
        console.log('SAVED:', newUser)
        done(null, newUser)
      } catch (error) {
        console.log('ERROR', error)
      }
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookAppId,
      clientSecret: facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id })

      if (existingUser) {
        done(null, existingUser)
        return
      }

      try {
        const newUser = await new User({ facebookId: profile.id }).save()
        console.log('SAVED:', newUser)
        done(null, newUser)
      } catch (error) {
        console.log('ERROR', error)
      }
    }
  )
)
