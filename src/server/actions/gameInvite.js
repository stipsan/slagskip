import invariant from 'invariant'

import {
  GAME_INVITE_SUCCESS,
  GAME_INVITE_FAILURE,
  RECEIVE_GAME_INVITE,
  ACCEPT_GAME_INVITE_SUCCESS,
  ACCEPT_GAME_INVITE_FAILURE,
  RECEIVE_GAME_INVITE_ACCEPTED,
  DECLINE_GAME_INVITE_SUCCESS,
  DECLINE_GAME_INVITE_FAILURE,
  RECEIVE_GAME_INVITE_DECLINED,
  CANCEL_GAME_INVITE_SUCCESS,
  CANCEL_GAME_INVITE_FAILURE,
  RECEIVE_GAME_INVITE_CANCELLED,
} from '../constants/ActionTypes'

export const gameInvite = (
  action,
  callback,
  socket,
  database,
  redis
) => () => {
  const authToken = socket.getAuthToken()
  return database.viewerSendsInvite(authToken, action.id, redis)
    .then(({ id, inviteOut }) => {
      invariant(id, 'database.viewerSendsInvite failed to return id')
      invariant(inviteOut, 'database.viewerSendsInvite failed to return inviteOut')

      callback(null, { type: GAME_INVITE_SUCCESS, id, inviteOut })
      socket.exchange.publish(`user:${id}`, {
        type: RECEIVE_GAME_INVITE,
        id: authToken.id,
        inviteIn: true
      })
    }).catch(error => {
      console.error(GAME_INVITE_FAILURE, error)
      callback(GAME_INVITE_FAILURE, error)
    })
}

export const acceptGameInvite = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  return database.viewerAcceptsInvite(authToken, action.id, redis)
    .then(({ id, inviteOut }) => {
      invariant(id, 'database.viewerAcceptsInvite failed to return id')
      invariant(inviteOut, 'database.viewerAcceptsInvite failed to return inviteOut')

      callback(null, { type: ACCEPT_GAME_INVITE_SUCCESS, id, inviteOut })
      socket.exchange.publish(`user:${id}`, {
        type: RECEIVE_GAME_INVITE_ACCEPTED,
        id: authToken.id,
        inviteIn: true
      })

      // @TODO send a RECEIVE_NEW_GAME to both viewer and friend with the game id
    }).catch(error => {
      console.error(ACCEPT_GAME_INVITE_FAILURE, error)
      callback(ACCEPT_GAME_INVITE_FAILURE, error)
    })
}

export const declineGameInvite = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  return database.viewerDeclinesInvite(authToken, action.id, redis)
    .then(({ id, inviteIn }) => {
      invariant(id, 'database.viewerDeclinesInvite failed to return id')
      invariant(inviteIn === false, 'database.viewerDeclinesInvite failed to return inviteIn')

      callback(null, { type: DECLINE_GAME_INVITE_SUCCESS, id, inviteIn })
      socket.exchange.publish(`user:${id}`, {
        type: RECEIVE_GAME_INVITE_DECLINED,
        id: authToken.id,
        inviteOut: false
      })

      // @TODO send a RECEIVE_NEW_GAME to both viewer and friend with the game id
    }).catch(error => {
      console.error(DECLINE_GAME_INVITE_FAILURE, error)
      callback(DECLINE_GAME_INVITE_FAILURE, error)
    })
}

export const cancelGameInvite = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  return database.viewerCancelsInvite(authToken, action.id, redis)
    .then(({ id, inviteOut }) => {
      invariant(id, 'database.viewerCancelsInvite failed to return id')
      invariant(inviteOut === false, 'database.viewerCancelsInvite failed to return inviteOut')

      callback(null, { type: CANCEL_GAME_INVITE_SUCCESS, id, inviteOut })
      socket.exchange.publish(`user:${id}`, {
        type: RECEIVE_GAME_INVITE_CANCELLED,
        id: authToken.id,
        inviteIn: false
      })

      // @TODO send a RECEIVE_NEW_GAME to both viewer and friend with the game id
    }).catch(error => {
      console.error(CANCEL_GAME_INVITE_FAILURE, error)
      callback(CANCEL_GAME_INVITE_FAILURE, error)
    })
}
