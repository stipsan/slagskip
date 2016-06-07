import { take, put } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  AUTHENTICATE_REQUESTED,
  CHECK_EMAIL_EXISTS_ASYNC,
  RECEIVE_DEAUTHENTICATE,
  DEAUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
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

export function *watchAuthState() {
  yield [
    checkEmailFlow(),
    loginFlow(),
    validateEmail(),
  ]
}
