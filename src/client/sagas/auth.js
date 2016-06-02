import { startSubmit, stopSubmit } from 'redux-form'
import { call, take, put } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  CHECK_EMAIL_EXISTS_REQUESTED,
  AUTHENTICATE_REQUESTED,
  CREATE_USER_REQUESTED,
  CREATE_USER_FAILURE,
} from '../constants/ActionTypes'

// @TODO move start/stopSubmit calls to a worker that is woke up by CHECK_EMAIL_EXISTS_REQUESTED

export function *watchAuthState() {
  while (true) { // eslint-disable-line no-constant-condition
    // @FIXME yield take(SOCKET_SUCCESS)
    console.log('watchAuthState', '1. connected')
    const checkEmailAction = yield take(CHECK_EMAIL_EXISTS_REQUESTED)
    console.log('watchAuthState', '2. checkEmailAction', checkEmailAction)
    const { successType } = checkEmailAction.payload
    console.log('watchAuthState', '3. successType', successType)
    yield put(startSubmit('login'))
    console.log('watchAuthState', '4. startSubmit')
    const emitCheckEmailAction = { type: SOCKET_EMIT, payload: checkEmailAction }
    console.log('watchAuthState', '5. emitCheckEmailAction', emitCheckEmailAction)
    const test = yield put(emitCheckEmailAction)
    console.log('watchAuthState', '6. yield put(emitCheckEmailAction)', test)
    yield take(successType)
    console.log('watchAuthState', '7. yield take(successType)', successType)
    yield put(stopSubmit('login'))


  }
}
