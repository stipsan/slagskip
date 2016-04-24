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
      // sc will send this data to the client
      socket.setAuthToken(authToken)

      const successAction = {
        type: AUTHENTICATE_SUCCESS,
        authToken: socket.getAuthToken()
      }

      callback(null, successAction)

      return database.getViewer(authToken, redis)
    }).catch(error => {
      console.error(AUTHENTICATE_FAILURE, error)
      callback(AUTHENTICATE_FAILURE, error)
      throw error
    }).then(viewer => {
      invariant(viewer.friendIds, 'database.getViewer failed to return friendIds')
      invariant(viewer.invites, 'database.getViewer failed to return invites')
      invariant(viewer.games, 'database.getViewer failed to return games')

      dispatch({
        type: RECEIVE_VIEWER,
        friendIds: viewer.friendIds,
        invites: viewer.invites,
        games: viewer.games,
      })
      const friendIds = getState().getIn(['viewer', 'friendIds'])
      const games = getState().getIn(['viewer', 'games'])
      socket.emit('dispatch', {
        type: RECEIVE_VIEWER,
        friendIds,
        games,
      })
      const authToken = socket.getAuthToken()
      const exchangeAction = {
        type: RECEIVE_FRIEND_NETWORK_STATUS,
        id: authToken.id,
        online: '1',
        lastVisit: new Date().toJSON()
      }
      viewer.friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })
    }).catch(error => {
      console.error(error)
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
      const friendIds = getState().getIn(['viewer', 'friendIds'])
      const exchangeAction = {
        type: RECEIVE_FRIEND_NETWORK_STATUS,
        id: authToken.id,
        online: '0',
        lastVisit
      }
      friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })

      socket.kickOut(`user:${authToken.id}`)
      socket.deauthenticate()

      callback(null, { type: DEAUTHENTICATE_SUCCESS, authToken })
    }).catch(error => {
      console.error(DEAUTHENTICATE_FAILURE, error)
      callback(DEAUTHENTICATE_FAILURE, error)
    })
}

export const broadcastNetworkStatus = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const { id, lastVisit, online } = action
  return database.getViewer({ id }, redis)
    .then(viewer => {
      invariant(viewer.friendIds, 'database.getViewer failed to return friendIds')

      const exchangeAction = {
        type: RECEIVE_FRIEND_NETWORK_STATUS,
        online,
        lastVisit,
        id
      }
      viewer.friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })

      if (online === '0') {
        return database.setViewerOffline(socket.getAuthToken(), lastVisit, redis)
      }
    })
}
