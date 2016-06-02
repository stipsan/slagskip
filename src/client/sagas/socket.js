import { delay, eventChannel } from 'redux-saga'
import { take, fork, call, put, race, cps, actionChannel } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
} from '../constants/ActionTypes'
import { socket } from '../services'

global.test = socket
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
      const action = yield take(chan)
      console.log('watchServerRequests:', action)
      yield put(action)
    }
  } finally {
    console.log('watchServerRequests terminated')
  }
}


// @FIXME client and server can likely share a lot of code in the socket sagas
export function *emitEvent(action) {

  yield cps([socket, socket.emit], 'request', action)
}

export function *handleEmit(action) {
  const { successType, failureType } = action.payload


  yield fork(emitEvent, action)


  const results = yield race({
    success: take(successType),
    failure: take(failureType),
    // response: take([successType, failureType]),
    // response: call(waitForServerResponse, successType, failureType),
    pingTimeout: take(),
    pongTimeout: call(delay, 10000),
  })
  console.log('emitEvent results', results)
}

export function *watchSocketEmits() {
  console.log('1- Create a channel for request actions', SOCKET_EMIT)
  const requestChan = yield actionChannel(SOCKET_EMIT)
  console.log('we got a channel')
  while (true) { // eslint-disable-line
    console.log('2- take from the channel')
    const { payload } = yield take(requestChan)
    console.log('3- Note that we\'re using a blocking call', payload)
    yield call(handleEmit, payload)
  }
}

// function* handleRequest(payload) { ... }
