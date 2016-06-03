import { take, put } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  CHECK_EMAIL_EXISTS_REQUESTED,
  AUTHENTICATE_REQUESTED,
  CREATE_USER_REQUESTED,
} from '../constants/ActionTypes'

export function *authorize(email, password) {
  //
}

export function *watchCheckEmail() {
  //
}

export function *watchAuthState() {
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
