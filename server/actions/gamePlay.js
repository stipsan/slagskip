import invariant from 'invariant'
import {
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
} from '../constants/ActionTypes'

export const loadGame = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  return database.loadGame(authToken, action.id, redis)
    .then(game => {
      invariant(game.id, 'Requires gameId to be returned')

      

      callback(null, { type: LOAD_GAME_SUCCESS, ...game })
      socket.exchange.publish(`user:${id}`, {
        type: RECEIVE_GAME_INVITE,
        id: authToken.id,
        inviteIn: true
      })
    }).catch(error => {
      console.error(LOAD_GAME_FAILURE, error)
      callback(LOAD_GAME_FAILURE, error.message || error)
    })
}