import { socketEmit, createChannelSubscription } from 'redux-saga-sc'
import { call, take, put } from 'redux-saga/effects'

import {
  VIEWER_SUCCESS,
} from '../constants/ActionTypes'

export function *watchExchange(socket) {
  while (yield take(VIEWER_SUCCESS)) { // eslint-disable-line no-constant-condition
    const authToken = socket.getAuthToken()
    const chan = yield call(createChannelSubscription, socket.exchange, `user:${authToken.id}`)

    while (true) { // eslint-disable-line no-constant-condition
      const action = yield take(chan)
      yield put(socketEmit(action))
    }
  }
}
