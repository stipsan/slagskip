import invariant from 'invariant'
import { socketEmit } from 'redux-saga-sc'
import { cps, fork, call, take, put } from 'redux-saga/effects'

import {
  NEW_GAME_REQUESTED,
  RECEIVE_NEW_GAME,
} from '../constants/ActionTypes'

export function *getNewGame({ successType, failureType, ...game }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const gameId = yield call(database.newGame, authToken, game.versus, game.board, redis)
    invariant(gameId, 'Failed to create new game')
    yield put(socketEmit({ type: successType, payload: {
      id: gameId,
      versus: game.versus,
    } }))
    yield cps([socket.exchange, socket.exchange.publish], `user:${game.versus}`, {
      type: RECEIVE_NEW_GAME,
      id: gameId,
      versus: authToken.id,
    })
  } catch ({ name, message }) {
    yield put(socketEmit({ type: failureType, payload: { name, message } }))
  }
}

export function *watchNewGame(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(NEW_GAME_REQUESTED)
    yield fork(getNewGame, payload, socket, database, redis)
  }
}
