import { startSubmit, stopSubmit } from 'redux-form'
import { channel, delay } from 'redux-saga'
import { take, fork, call, put, race, cps } from 'redux-saga/effects'

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

export function *emitEvent(action) {
  console.log('emitEWv', action)
  yield cps([socket, socket.emit], 'request', action)
}

export function *handleEmit(action, successType, failureType) {
  socket.emit('request', action)
  yield put(startSubmit('login'))
  console.log('after start submit')
  yield fork(emitEvent, action)
  console.log('socket emit')


  console.log('before race', successType, failureType)
  const results = yield race({
    success: take(successType),
    failure: take(failureType),
    // response: call(waitForServerResponse, successType, failureType),
    timeout: call(delay, 10000),
  })
  console.log('handleEmit', results)
  yield put(stopSubmit('login'))
  console.log('stopSubmit')


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
