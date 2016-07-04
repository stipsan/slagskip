import { startSubmit, stopSubmit } from 'redux-form'
import { socketRequest } from 'redux-saga-sc'
import { take, put } from 'redux-saga/effects'

import {
  SOCKET_SUCCESS,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  AUTHENTICATE_REQUESTED,
  CHECK_EMAIL_EXISTS_ASYNC,
  RECEIVE_DEAUTHENTICATE,
  DEAUTHENTICATE_REQUESTED,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
  AUTHENTICATE_FAILURE,
  CREATE_USER_REQUESTED,
  CREATE_USER_FAILURE,
  AUTHENTICATE_SUCCESS,
  VIEWER_REQUESTED,
  VIEWER_SUCCESS,
  VIEWER_FAILURE,
} from '../constants/ActionTypes'
import { socket } from '../services'

export function *authorize() {
  //
}

export function *watchLoginForm() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { successType, failureType } } = yield take([
      CHECK_EMAIL_EXISTS_REQUESTED,
    ])
    yield put(startSubmit('login'))
    yield take([successType, failureType])
    yield put(stopSubmit('login'))
  }
}

export function *loginFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const authAction = yield take(AUTHENTICATE_REQUESTED)
    yield put(socketRequest(authAction))
    yield take([RECEIVE_DEAUTHENTICATE, DEAUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE])
  }
}

export function *registerFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const authAction = yield take(CREATE_USER_REQUESTED)
    yield put(socketRequest(authAction))
    yield take([RECEIVE_DEAUTHENTICATE, DEAUTHENTICATE_SUCCESS, CREATE_USER_FAILURE])
  }
}

export function *watchViewerRequests() {
  while (true) { // eslint-disable-line no-constant-condition
    yield put(socketRequest({
      type: VIEWER_REQUESTED,
      payload: {
        successType: VIEWER_SUCCESS,
        failureType: VIEWER_FAILURE,
      }
    }))
    yield take([RECEIVE_DEAUTHENTICATE, DEAUTHENTICATE_SUCCESS, CREATE_USER_FAILURE])
  }
}

export function *validateEmail() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { email, resolve } } = yield take(CHECK_EMAIL_EXISTS_ASYNC)
    const emitCheckEmailAction = socketRequest({
      type: CHECK_EMAIL_EXISTS_REQUESTED,
      payload: {
        successType: CHECK_EMAIL_EXISTS_SUCCESS,
        failureType: CHECK_EMAIL_EXISTS_FAILURE,
        email,
      }
    })
    yield put(emitCheckEmailAction)
    yield take([CHECK_EMAIL_EXISTS_SUCCESS, CHECK_EMAIL_EXISTS_FAILURE])
    resolve()
  }
}

export function *watchSocketSuccess() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { isAuthenticated } } = yield take(SOCKET_SUCCESS)
    if (isAuthenticated) {
      yield put(socketRequest({
        type: VIEWER_REQUESTED,
        payload: {
          successType: VIEWER_SUCCESS,
          failureType: VIEWER_FAILURE,
        }
      }))
    }
    yield take([AUTHENTICATE_SUCCESS, VIEWER_SUCCESS])
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
  }
}

export function *watchAuthState() {
  yield [
    loginFlow(),
    registerFlow(),
    validateEmail(),
    watchSocketSuccess(),
    watchLoginForm(),
    watchViewerRequests(),
  ]
}
