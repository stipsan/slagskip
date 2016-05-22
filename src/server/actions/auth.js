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
  { credentials },
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => database.authenticate(credentials, redis)
    .then(authToken => {
      // sc will send this data to the client
      socket.setAuthToken(authToken)

      const successAction = {
        type: AUTHENTICATE_SUCCESS,
        authToken: socket.getAuthToken()
      }

      callback(null, successAction)

      return database.getViewer(authToken, redis)
    })
    .catch(error => {
      console.error(AUTHENTICATE_FAILURE, error)
      return callback(AUTHENTICATE_FAILURE, error)
    })
    .then(viewer => {
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
    })
    .catch(error => {
      console.error(error)
    })

export const deauthenticateRequest = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  const lastVisit = new Date().toJSON()
  return database.setViewerOffline(authToken, lastVisit, redis)
    .then(offlineAuthToken => {
      const friendIds = getState().getIn(['viewer', 'friendIds'])
      const exchangeAction = {
        type: RECEIVE_FRIEND_NETWORK_STATUS,
        id: offlineAuthToken.id,
        online: '0',
        lastVisit
      }
      friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${friendId}`, exchangeAction)
      })

      socket.kickOut(`user:${offlineAuthToken.id}`)
      socket.deauthenticate()

      callback(null, { type: DEAUTHENTICATE_SUCCESS, offlineAuthToken })
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
) => () => {
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

      if ('0' === online) {
        return database.setViewerOffline(socket.getAuthToken(), lastVisit, redis)
      }

      return viewer
    })
}
