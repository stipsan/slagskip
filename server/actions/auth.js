import invariant from 'invariant'
import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  RECEIVE_VIEWER,
  RECEIVE_FRIEND_NETWORK_STATUS,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
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
        type: RECEIVE_FRIEND_NETWORK_STATUS,
        // @TODO username necessary?
        username: viewer.authToken.username,
        id: viewer.authToken.id,
        online: '1',
      }
      viewer.friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })
    })
}

export const deauthenticateRequest = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  const lastVisit = new Date().toJSON()
  return database.setViewerOffline(socket.getAuthToken(), lastVisit, redis)
    .then(offlineAuthToken => {
      callback(null, {type: DEAUTHENTICATE_SUCCESS, authToken })
      
      return database.getViewer(offlineAuthToken, redis)
    }).catch(error => {
      console.error(DEAUTHENTICATE_FAILURE, error);
      res(DEAUTHENTICATE_FAILURE, error)
    }).then(viewer => {
      socket.deauthenticate()
      
      invariant(viewer.authToken, 'database.getViewer failed to return an authToken')
      invariant(viewer.friendIds, 'database.getViewer failed to return friendIds')

      const exchangeAction = {
        type: RECEIVE_FRIEND_NETWORK_STATUS,
        // @TODO username necessary?
        username: authToken.username,
        id: viewer.authToken.id,
        online: '0',
        lastVisit
      }
      viewer.friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })
    })
}

/*
socket.on(TYPES.LOGOUT_REQUEST, function (user, res) {
  if(!socket.authToken) return res('NO_SESSION', {message: 'You can\'t logout without being logged in, buddy'})
  const username = socket.authToken.username
  //console.log(TYPES.LOGOUT_REQUEST, username);
  database.setViewerOffline(
    { username },
    data => {
      //console.log(TYPES.LOGOUT_SUCCESS, data);
      res(null, { username })
      scServer.exchange.publish(
        'service',
        Object.assign(
          { type: TYPES.RECEIVE_FRIEND_NETWORK_STATUS },
          data
        )
      )
      socket.deauthenticate()
      //socket.kickOut([channel, message, callback])
    },
    error => {
      //console.log(TYPES.LOGOUT_FAILURE, error);
      res(TYPES.LOGOUT_FAILURE, error)
      socket.deauthenticate()
    }
  )
  
})
//*/