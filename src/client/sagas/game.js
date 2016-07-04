import Push from 'push.js'
import { push, replace } from 'react-router-redux'
import { take, put } from 'redux-saga/effects'

import {
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCESS,
  LOAD_GAME_REQUESTED,
  LOAD_GAME_SUCCESS,
  RECEIVE_NEW_GAME,
} from '../constants/ActionTypes'

export function *watchNewGame() {
  while (yield take(NEW_GAME_REQUESTED)) { // eslint-disable-line no-constant-condition
    const { payload: { id } } = yield take(NEW_GAME_SUCCESS)
    if (id) {
      yield put(push(`/game/${id}`))
    }
  }
}

export function *watchLoadGame() {
  while (yield take(LOAD_GAME_REQUESTED)) { // eslint-disable-line no-constant-condition
    const { payload: { gameState, id } } = yield take(LOAD_GAME_SUCCESS)
    if ('setup' === gameState) {
      yield put(replace(`/join/${id}`))
    }
  }
}

export function *watchGameNotification() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { id, versus } } = yield take(RECEIVE_NEW_GAME)
    console.log('game notification', id, versus)
    Push.create(`${versus} invited you to a new game`, { onClick: () => {
      location.pathname = `/game/${id}`
    } })
  }
}

export function *watchGame() {
  yield [
    watchNewGame(),
    watchLoadGame(),
    watchGameNotification(),
  ]
}
