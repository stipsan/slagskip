import { createEventChannel } from 'redux-saga-sc'
import { take, put, call, cps, fork } from 'redux-saga/effects'

export function *emitEvent(socket, action) {
  yield cps([socket, socket.emit], 'dispatch', action)
}

// @TODO refactor to worker that automatically retry until the client pings back in emitEvent
export function *handleEmit(socket, action) {
  console.log('after start submit')
  yield fork(emitEvent, socket, action)
  console.log('socket emit')
}

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
