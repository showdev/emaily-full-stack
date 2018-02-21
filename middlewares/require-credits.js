exports.requireCredits = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enought credits to perform the operation' })
  }
  next()
}