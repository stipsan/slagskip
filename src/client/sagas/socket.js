import { startSubmit, stopSubmit } from 'redux-form'
import { delay, eventChannel } from 'redux-saga'
import { socketRequest } from 'redux-saga-sc'
import { take, fork, call, put, race, cps, actionChannel, cancelled } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  SOCKET_SUCCESS,
  SOCKET_PONG_TIMEOUT,
  SOCKET_TASK_TIMEOUT,
} from '../constants/ActionTypes'
import { socket } from '../services'

export function handleSocketConnect() {
  return eventChannel(listener => {
    const socketConnectEventHandler = payload => listener({ type: SOCKET_SUCCESS, payload, socket })
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
  yield put(socketRequest(action))
  yield take(action.type)
  yield put(startSubmit('login'))
  yield take([action.payload.successType, action.payload.failureType])
  yield put(stopSubmit('login'))
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
