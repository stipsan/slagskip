import { startSubmit, stopSubmit } from 'redux-form'
import { channel, delay, eventChannel } from 'redux-saga'
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

// @FIXME client and server can likely share a lot of code in the socket sagas
export function *emitEvent(action) {
  yield cps([socket, socket.emit], 'request', action)
}

export function *handleEmit(action, successType, failureType) {
  console.log('handleEmit')
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

export function handleSocketEvent(event) {
  console.log('socket is listening to:', event)
  return eventChannel(listener => {
    const handleClientRequest = (action, cb) => {
      // notify the client that the request is received
      cb() // eslint-disable-line
      console.log('handleSocketEvent:', event, action)
      listener(action)
    }
    socket.on(event, handleClientRequest)
    return () => {
      console.log('socket stopped listening to:', event)
      socket.off(event, handleClientRequest)
    }
  })
}

export function *watchServerRequests() {
  const chan = yield call(handleSocketEvent, 'request')
  try {
    while (true) { // eslint-disable-line
      let action = yield take(chan)
      console.log('watchServerRequests:', action)
      yield put(action)
    }
  } finally {
    console.log('watchServerRequests terminated')
  }
}
