const googleClientID = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const facebookAppId = process.env.FACEBOOK_APP_ID
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET
const cookieKey = process.env.COOKIE_KEY

console.log(
  'KEYS: ',
  googleClientID,
  googleClientSecret,
  facebookAppId,
  facebookAppSecret,
  cookieKey
)

module.exports = {
  googleClientID,
  googleClientSecret,
  facebookAppId,
  facebookAppSecret,
  cookieKey,
}
