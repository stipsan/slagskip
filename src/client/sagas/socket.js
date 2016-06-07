import { startSubmit, stopSubmit } from 'redux-form'
import { delay, eventChannel } from 'redux-saga'
import { take, fork, call, put, race, cps, actionChannel, cancelled } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  SOCKET_SUCCESS,
  SOCKET_PONG_TIMEOUT,
  SOCKET_TASK_TIMEOUT,
} from '../constants/ActionTypes'
import { socket } from '../services'

export function handleServerRequest(event) {
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
  const chan = yield call(handleServerRequest, 'dispatch')
  try {
    while (true) { // eslint-disable-line
      const action = yield take(chan)
      console.log('watchServerRequests:', action)
      yield put(action)
    }
  } finally {
    if (yield cancelled()) {
        // @FIXME put in an action creator
      yield put({
        type: 'UNEXPECTED_ERROR',
        payload: {
          message: 'watchServerRequests saga got cancelled!'
        }
      })
    }
  }
}

export function handleSocketConnect() {
  return eventChannel(listener => {
    const socketConnectEventHandler = payload => listener({ type: SOCKET_SUCCESS, payload })
    socket.on('connect', socketConnectEventHandler)
    return () => {
      socket.off('connect', socketConnectEventHandler)
    }
  })
}

export function *watchSocketConnect() {
  const chan = yield call(handleSocketConnect)
  try {
    while (true) { // eslint-disable-line
      const action = yield take(chan)
      yield put(action)
    }
  } finally {
    if (yield cancelled()) {
        // @FIXME put in an action creator
      yield put({
        type: 'UNEXPECTED_ERROR',
        payload: {
          message: 'watchSocketConnect saga got cancelled!'
        }
      })
    }
  }
}

// @TODO
/*
socket.on('authenticate', () => {
  subscribeChannels(store, next, action, socket, [socket.getAuthToken().privateChannel])

  if ('ga' in global) {
    global.ga('set', 'userId', socket.getAuthToken().id)
  }
  if ('rg4js' in global) {
    global.rg4js('setUser', {
      identifier: socket.getAuthToken().id,
      isAnonymous: false,
      email: socket.getAuthToken().email,
      firstName: socket.getAuthToken().username,
    })
  }
})
*/


// @FIXME client and server can likely share a lot of code in the socket sagas
export function *emitEvent(action) {
  try {
    yield cps([socket, socket.emit], 'dispatch', action)
  } catch (error) {
    if ('TimeoutError' === error.name) {
      yield put({ type: SOCKET_PONG_TIMEOUT, payload: { error } })
    } else {
      yield put({ type: action.payload.failureType, payload: { error } })
    }
  }
}

// @TODO move start/stopSubmit calls to a worker that is woke up by CHECK_EMAIL_EXISTS_REQUESTED
export function *handleEmit(action) {
  const { successType, failureType } = action.payload

  yield put(startSubmit('login'))

  let retries = 0
  let payload

  while (3 > retries++) {
    yield fork(emitEvent, action)
    console.log('forked the emitEvent', action)
    const { response, timeout } = yield race({
      response: take([successType, failureType]),
      timeout: yield race({
        response: take([successType, failureType]),
        pongTimeout: take(SOCKET_PONG_TIMEOUT),
        taskTimeout: call(delay, 10000),
      }),
    })
    if (response) {
      yield put(stopSubmit('login'))
      return response
    }
    if (timeout) {
      payload = timeout
    }
    if (timeout && timeout.taskTimeout) {
      yield put({ type: SOCKET_TASK_TIMEOUT })
    }
  }
  yield put(stopSubmit('login'))
  yield put({ type: failureType, payload })
}

export function *watchSocketEmits() {
  console.log('1- Create a channel for request actions', SOCKET_EMIT)
  const requestChan = yield actionChannel(SOCKET_EMIT)
  while (true) { // eslint-disable-line
    const { payload } = yield take(requestChan)
    yield call(handleEmit, payload)
  }
}

// function* handleRequest(payload) { ... }
