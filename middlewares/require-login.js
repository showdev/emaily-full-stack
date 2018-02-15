exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Your must log in' })
  }
  next()
}
