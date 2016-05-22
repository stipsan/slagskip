import * as TYPES from '../../constants/ActionTypes'

export const applySocketMiddleware = wsServer => {

  // @FIXME
  /* eslint no-unreachable: ["off"] */
  return wsServer

  wsServer.addMiddleware(wsServer.MIDDLEWARE_SUBSCRIBE,
    (req, next) => {
      const authToken = req.socket.getAuthToken()
      if (req.authTokenExpiredError) {
        return next(req.authTokenExpiredError) // Fail with a default auth token expiry error
      } else if (authToken && authToken.privateChannel === req.channel) {
        return next() // Allow
      }
      // console.log('middleware.MIDDLEWARE_SUBSCRIBE blocked', req.channel,
      // authToken && authToken.privateChannel)
      return next(true) // Block
      // next(true); // Passing true to next() blocks quietly
      // (without raising a warning on the server-side)
    }
  )

  wsServer.addMiddleware(wsServer.MIDDLEWARE_PUBLISH_IN,
    (req, next) =>
      // const authToken = req.socket.getAuthToken()
      // console.log('middleware.MIDDLEWARE_PUBLISH_IN', req.channel,
      // req.data, authToken && authToken.username)
      next()

      /*
      if (true) {
        next() // Allow
      } else {
        //var err = MyCustomPublishInFailedError(req.socket.id + '
        // cannot publish channel ' + req.channel);
        //next(err); // Block
        // next(true); // Passing true to next() blocks quietly
        // (without raising a warning on the server-side)
      }
      //*/

  )

  wsServer.addMiddleware(wsServer.MIDDLEWARE_PUBLISH_OUT,
    (req, next) => {
      const authToken = req.socket.getAuthToken()
      // console.log('middleware.MIDDLEWARE_PUBLISH_OUT', req.channel,
      // req.data, authToken && authToken.username)
      if (/* !req.socket.authToken */!authToken) {
        return next(true) // Deny silently
      } else if (req.data.type === TYPES.RECEIVE_FRIEND &&
        req.data.username === req.socket.authToken.username) {
        return next(true) // Deny silently
      }
      return next() // Allow
      // var err = MyCustomPublishOutFailedError('Blocked publishing
      // message out to ' + req.socket.id);
      // next(err); // Block with notice
      // next(true); // Passing true to next() blocks quietly
      // (without raising a warning on the server-side)
    }
  )

  wsServer.addMiddleware(wsServer.MIDDLEWARE_EMIT,
    (req, next) => {
      // only AUTHENTICATE_REQUESTED unless authToken
      // console.log('middleware.MIDDLEWARE_EMIT', req.event, req.data,
      // authToken && authToken.username)

      next()
      /*
      if (true) {
        next() // Allow
      } else {
        // var err = MyCustomEmitFailedError(req.socket.id + ' is
        // not allowed to emit event ' + req.data);
        // next(err); // Block
        // next(true); // Passing true to next() blocks quietly
        // (without raising a warning on the server-side)
      }
      //*/
    }
  )

  return wsServer
}
