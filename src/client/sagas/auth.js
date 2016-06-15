import { take, put } from 'redux-saga/effects'

import { signInWithEmailAndPassword } from '../actions'
import {
  SOCKET_EMIT,
  SOCKET_SUCCESS,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  AUTHENTICATE_REQUESTED,
  CHECK_EMAIL_EXISTS_ASYNC,
  RECEIVE_DEAUTHENTICATE,
  DEAUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CREATE_USER_REQUESTED,
  CREATE_USER_FAILURE,
  AUTHENTICATE_SUCCESS,
  VIEWER_REQUESTED,
  VIEWER_SUCCESS,
  VIEWER_FAILURE,
} from '../constants/ActionTypes'

export function *authorize() {
  //
}

export function *checkEmailFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const authAction = yield take(CHECK_EMAIL_EXISTS_REQUESTED)
    yield put({ type: SOCKET_EMIT, payload: authAction })
    yield take([authAction.successType, authAction.failureType])
  }
}

export function *loginFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const authAction = yield take(AUTHENTICATE_REQUESTED)
    yield put({ type: SOCKET_EMIT, payload: authAction })
    yield take([RECEIVE_DEAUTHENTICATE, DEAUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE])
  }
}

export function *registerFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const authAction = yield take(CREATE_USER_REQUESTED)
    yield put({ type: SOCKET_EMIT, payload: authAction })
    yield take([RECEIVE_DEAUTHENTICATE, DEAUTHENTICATE_SUCCESS, CREATE_USER_FAILURE])
  }
}

export function *watchViewerRequests() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(AUTHENTICATE_SUCCESS)
    yield put({ type: SOCKET_EMIT, payload: {
      type: VIEWER_REQUESTED,
      payload: {
        successType: VIEWER_SUCCESS,
        failureType: VIEWER_FAILURE,
      }
    } })
    yield take([RECEIVE_DEAUTHENTICATE, DEAUTHENTICATE_SUCCESS, CREATE_USER_FAILURE])
  }
}

export function *validateEmail() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { email, resolve } } = yield take(CHECK_EMAIL_EXISTS_ASYNC)
    const emitCheckEmailAction = { type: SOCKET_EMIT, payload: {
      type: CHECK_EMAIL_EXISTS_REQUESTED,
      payload: {
        successType: CHECK_EMAIL_EXISTS_SUCCESS,
        failureType: CHECK_EMAIL_EXISTS_FAILURE,
        email,
      }
    } }
    yield put(emitCheckEmailAction)
    yield take([CHECK_EMAIL_EXISTS_SUCCESS, CHECK_EMAIL_EXISTS_FAILURE])
    resolve()
  }
}

export function *watchSocketSuccess() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { isAuthenticated }, socket } = yield take(SOCKET_SUCCESS)
    if (isAuthenticated) {
      yield put({ type: SOCKET_EMIT, payload: {
        type: VIEWER_REQUESTED,
        payload: {
          successType: VIEWER_SUCCESS,
          failureType: VIEWER_FAILURE,
        }
      } })
    }
  }
}

export function *watchAuthState() {
  yield [
    checkEmailFlow(),
    loginFlow(),
    registerFlow(),
    validateEmail(),
    watchSocketSuccess(),
  ]
}
