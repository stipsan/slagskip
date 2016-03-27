import invariant from 'invariant'
import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  RECEIVE_VIEWER,
  RECEIVE_FRIEND_NETWORK_STATUS,
} from '../constants/ActionTypes'

export const authenticateRequest = (
  { username },
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  return database.authenticate({ username }, redis)
    .then(authToken => {
      socket.setAuthToken(authToken)

      callback(null, Object.assign({type: AUTHENTICATE_SUCCESS}, {authToken: socket.getAuthToken()}))
      
      return database.getViewer(authToken, redis)
    }).catch(error => {
      console.log(AUTHENTICATE_FAILURE, error);
      res(AUTHENTICATE_FAILURE, error)
    }).then(viewer => {
      invariant(viewer.authToken, 'database.getViewer failed to return an authToken')
      invariant(viewer.authToken.privateChannel, 'database.getViewer authToken did not contain the property `privateChannel`')

      socket.emit('dispatch', {
        type: RECEIVE_VIEWER,
        friendIds: viewer.friendIds,
        invites: viewer.invites
      })
      const exchangeAction = {
        // @TODO username necessary?
        username: viewer.authToken.username,
        id: viewer.authToken.id,
        online: true,
      }
      viewer.friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })
    })
}