import { push } from 'react-router-redux'
import { socketEmit, socketRequest } from 'redux-saga-sc'
import { take, put } from 'redux-saga/effects'

import {
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCESS,
} from '../constants/ActionTypes'

export function *watchNewGame() {
  while (yield take(NEW_GAME_REQUESTED)) { // eslint-disable-line no-constant-condition
    const { payload: { id }, socket } = yield take(NEW_GAME_SUCCESS)
    if (id) {
      yield put(push(`/game/${id}`))
    }
  }
}
