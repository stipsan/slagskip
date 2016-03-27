import {
  AUTHENTICATE_SUCCESS
} from '../constants/ActionTypes'

export const loginRequest = ({ username }, callback, socket, database, redis) => {
  return database.authenticate({ username }, redis)
    .then(authToken => {
      socket.setAuthToken(authToken)
      
      callback(null, Object.assign({type: AUTHENTICATE_SUCCESS}, {authToken: socket.getAuthToken()}))
    })
}