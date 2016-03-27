const loginRequest = ({ username }, callback, socket, database, redis) => {
  return database.authenticate({ username }, redis)
    .then(authToken => {
      socket.setAuthToken(authToken)
      
      callback(null, Object.assign({type: TYPES.AUTHENTICATE_SUCCESS}, {authToken: socket.getAuthToken()}))
    })
}

const mapTypeToAction = {
  [TYPES.LOGIN_REQUEST]: loginRequest
}

socket.on('dispatch', ({ type, ...action }, callback) => {
  return store.dispatch(mapTypeToAction[type](action, callback, socket, database, redis))
})

export const createDispatcher = (socket, database, redis) => {
  
}