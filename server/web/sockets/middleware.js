/*eslint no-console: 0 */

module.exports = function(wsServer){

  const TYPES = require('../../constants/ActionTypes')

  wsServer.addMiddleware(wsServer.MIDDLEWARE_SUBSCRIBE,
    function (req, next) {
      const authToken = req.socket.getAuthToken()
      console.info('middleware.MIDDLEWARE_SUBSCRIBE', req.channel, authToken && authToken.username)
      if (req.authTokenExpiredError) {
        next(req.authTokenExpiredError) // Fail with a default auth token expiry error
      } else if (authToken && authToken.channels.indexOf(req.channel) !== -1) {
        next() // Allow
      } else {
        next(true) // Block
        // next(true); // Passing true to next() blocks quietly (without raising a warning on the server-side)
      }
    }
  )
  
  wsServer.addMiddleware(wsServer.MIDDLEWARE_PUBLISH_IN,
    function (req, next) {
      const authToken = req.socket.getAuthToken()
      console.info('middleware.MIDDLEWARE_PUBLISH_IN', req.channel, req.data, authToken && authToken.username)
      next()
      
      /*
      if (true) {
        next() // Allow
      } else {
        //var err = MyCustomPublishInFailedError(req.socket.id + ' cannot publish channel ' + req.channel);
        //next(err); // Block
        // next(true); // Passing true to next() blocks quietly (without raising a warning on the server-side)
      }
      //*/
    }
  )
  
  wsServer.addMiddleware(wsServer.MIDDLEWARE_PUBLISH_OUT,
    function (req, next) {
      const authToken = req.socket.getAuthToken()
      console.info('middleware.MIDDLEWARE_PUBLISH_OUT', req.channel, req.data, authToken && authToken.username)
      if(!req.socket.authToken) {
        next(true) // Deny silently
      } else if (req.data.type === TYPES.RECEIVE_FRIEND && req.data.username === req.socket.authToken.username) {
        next(true) // Deny silently
      } else {
        next() // Allow
        //var err = MyCustomPublishOutFailedError('Blocked publishing message out to ' + req.socket.id);
        //next(err); // Block with notice
        // next(true); // Passing true to next() blocks quietly (without raising a warning on the server-side)
      }
    }
  )
  
  wsServer.addMiddleware(wsServer.MIDDLEWARE_EMIT,
    function (req, next) {
      const authToken = req.socket.getAuthToken()
      // only LOGIN_REQUEST unless authToken
      console.info('middleware.MIDDLEWARE_EMIT', req.event, req.data, authToken && authToken.username)
      
      next()
      /*
      if (true) {
        next() // Allow
      } else {
        //var err = MyCustomEmitFailedError(req.socket.id + ' is not allowed to emit event ' + req.data);
        //next(err); // Block
        // next(true); // Passing true to next() blocks quietly (without raising a warning on the server-side)
      }
      //*/
    }
  )

}