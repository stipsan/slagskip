import invariant from 'invariant'
import { socketEmit } from 'redux-saga-sc'
import { fork, call, take, put, select } from 'redux-saga/effects'

import {
  NEW_GAME_REQUESTED,
} from '../constants/ActionTypes'
import { getFriendIds, getInvites } from '../selectors'

export function *getNewGame({ successType, failureType, ...game }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const gameId = yield call(database.newGame, authToken, game.versus, game.board, redis)
    invariant(gameId, 'Failed to create new game')
    yield put(socketEmit({ type: successType, payload: { friends } }))
  } catch (error) {
    yield put(socketEmit({ type: failureType, payload: { error } }))
  }
}

export function *watchNewGame(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(NEW_GAME_REQUESTED)
    yield fork(getNewGame, payload, socket, database, redis)
  }
}
