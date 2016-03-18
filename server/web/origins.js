const origins = process.env.ORIGINS || '*:*'
const allowAllOrigins = origins ? origins.indexOf('*:*') !== -1 : true

module.exports = () => function(req, res, next) {
  if (allowAllOrigins) {
    return next()
  }

  if(origins.indexOf(req.hostname + ':') === -1) {
    const hostname = origins.split(':')[0]
    return hostname ? res.redirect(`${req.protocol}://${hostname}${req.url}`) : res.send(403)
  }

  next()  
}