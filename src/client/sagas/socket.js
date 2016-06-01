import { startSubmit, stopSubmit } from 'redux-form'
import { channel, delay } from 'redux-saga'
import { take, fork, call, put, race } from 'redux-saga/effects'

import { socket } from '../services'

// @TODO turn this into a saga that can deal with timeouts and network issues
export function emit(action) {
  return new Promise((resolve, reject) =>
    socket.emit('dispatch', action, (err, data) => {
      console.log('socket is dispatching', action)
      if (err || !data) {
        console.log('socket error', err || {})
        return reject(err || {})
      }
      console.log('socket success', data)
      return resolve(data)
    })
)
}

export function *waitForServerResponse(successType, failureType) {
  yield take([successType, failureType])
}

export function *handleEmit(action, successType, failureType) {
  socket.emit('request', action)
  yield put(startSubmit('login'))
  const results = yield race({
    // success: take(successType),
    // failure: take(failureType),
    response: call(waitForServerResponse, successType, failureType),
    timeout: call(delay, 10000),
  })
  yield put(stopSubmit('login'))
  console.log('handleEmit', results)
}


export function* watchSocket() {
  // create a channel to queue incoming requests
  const chan = yield call(channel)

  // create 3 worker 'threads'
  for (let i = 0; i < 3; i++) {
    yield fork(handleRequest, chan)
  }

  while (true) { // eslint-disable-line
    const { payload } = yield take('REQUEST')
    yield put(chan, payload)
  }
}

function* handleRequest(chan) {
  while (true) { // eslint-disable-line
    const payload = yield take(chan)
    // process the request
  }
}
