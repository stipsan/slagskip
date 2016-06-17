import { createEventChannel } from 'redux-saga-sc'
import { take, put, call } from 'redux-saga/effects'

export function *watchClientRequests(socket) {
  const chan = yield call(createEventChannel, socket, 'dispatch')
  try {
    while (true) { // eslint-disable-line
      const action = yield take(chan)
      console.log('watchClientRequests:', action)
      yield put(action)
    }
  } finally {
    console.log('watchClientRequests terminated')
  }
}
