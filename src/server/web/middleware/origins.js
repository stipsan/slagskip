const origins = process.env.ORIGINS || '*:*'
const allowAllOrigins = origins ? -1 !== origins.indexOf('*:*') : true

module.exports = () => function originsMiddleware(req, res, next) {
  if (allowAllOrigins) {
    return next()
  }

  if (-1 === origins.indexOf(`${req.hostname}:`)) {
    const hostname = origins.split(':')[0]
    return hostname ? res.redirect(`${req.protocol}://${hostname}${req.url}`) : res.send(403)
  }

  return next()
}
