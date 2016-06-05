import { take, put, fork, race } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  AUTHENTICATE_REQUESTED,
  CREATE_USER_REQUESTED,
  CHECK_EMAIL_EXISTS_ASYNC,
} from '../constants/ActionTypes'

export function *authorize(email, password) {
  //
}

export function *watchValidateEmail() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { values, resolve } } = yield take(CHECK_EMAIL_EXISTS_ASYNC)
    const emitCheckEmailAction = { type: SOCKET_EMIT, payload: {
      type: CHECK_EMAIL_EXISTS_REQUESTED,
      payload: {
        successType: CHECK_EMAIL_EXISTS_SUCCESS,
        failureType: CHECK_EMAIL_EXISTS_FAILURE,
        email: values.get('email'),
      }
    } }
    yield put(emitCheckEmailAction)
    const { success, failure } = yield race({
      success: take(CHECK_EMAIL_EXISTS_SUCCESS),
      failure: take(CHECK_EMAIL_EXISTS_FAILURE),
    })
    resolve()
  }
}

export function *watchAuthState() {
  yield fork(watchValidateEmail)
  // @TODO wake up the worker on SOCKET_SUCCESS
  while (true) { // eslint-disable-line no-constant-condition
    const checkEmailAction = yield take(CHECK_EMAIL_EXISTS_REQUESTED)
    const { successType: checkEmailActionSuccessType } = checkEmailAction.payload

    const emitCheckEmailAction = { type: SOCKET_EMIT, payload: checkEmailAction }
    yield put(emitCheckEmailAction)
    yield take(checkEmailActionSuccessType)

    const authAction = yield take([CREATE_USER_REQUESTED, AUTHENTICATE_REQUESTED])
    const { successType: authActionSuccessType } = authAction.payload
    const emitAuthAction = { type: SOCKET_EMIT, payload: authAction }
    yield put(emitAuthAction)

    yield take(authActionSuccessType)
  }
}
