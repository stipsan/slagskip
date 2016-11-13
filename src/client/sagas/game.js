import { push, replace } from 'react-router-redux'
import { take, put } from 'redux-saga/effects'

import {
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCESS,
  LOAD_GAME_REQUESTED,
  LOAD_GAME_SUCCESS,
} from '../constants/ActionTypes'

export function* watchNewGame() {
  while (yield take(NEW_GAME_REQUESTED)) { // eslint-disable-line no-constant-condition
    const { payload: { id } } = yield take(NEW_GAME_SUCCESS)
    if (id) {
      yield put(push(`/game/${id}`))
    }
  }
}

export function* watchLoadGame() {
  while (yield take(LOAD_GAME_REQUESTED)) { // eslint-disable-line no-constant-condition
    const { payload: { gameState, id } } = yield take(LOAD_GAME_SUCCESS)
    if ('setup' === gameState) {
      yield put(replace(`/join/${id}`))
    }
  }
}

export function* watchGame() {
  yield [
    watchNewGame(),
    watchLoadGame(),
  ]
}
