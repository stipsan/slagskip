import { channel } from 'redux-saga'
import { take, fork } from 'redux-saga/effects'

import { socket } from '../services'

// @TODO turn this into a saga that can deal with timeouts and network issues

export const emit = (type, payload) => new Promise((resolve, reject) =>
  socket.emit('dispatch', { type, ...payload }, (err, data) => {
    console.log('emit dispatch', type)
    if (err) {
      return reject(err)
    }
    return resolve(data)
  })
)


export function* watchSocket() {
  // create a channel to queue incoming requests
  const chan = yield call(channel)

  // create 3 worker 'threads'
  for (var i = 0; i < 3; i++) {
    yield fork(handleRequest, chan)
  }

  while (true) {
    const { payload } = yield take('REQUEST')
    yield put(chan, payload)
  }
}

function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan)
    // process the request
  }
}
