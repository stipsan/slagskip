import { startSubmit, stopSubmit } from 'redux-form'
import { take, put } from 'redux-saga/effects'

import {
  SOCKET_EMIT,
  CHECK_EMAIL_EXISTS_REQUESTED,
  AUTHENTICATE_REQUESTED,
  CREATE_USER_REQUESTED,
} from '../constants/ActionTypes'

// @TODO move start/stopSubmit calls to a worker that is woke up by CHECK_EMAIL_EXISTS_REQUESTED

export function *watchAuthState() {
  while (true) { // eslint-disable-line no-constant-condition
    // @FIXME yield take(SOCKET_SUCCESS)
    console.log('watchAuthState', '1. connected')
    const checkEmailAction = yield take(CHECK_EMAIL_EXISTS_REQUESTED)
    console.log('watchAuthState', '2. checkEmailAction', checkEmailAction)
    const { successType: checkEmailActionSuccessType } = checkEmailAction.payload
    console.log('watchAuthState', '3. successType', checkEmailActionSuccessType)
    yield put(startSubmit('login'))
    console.log('watchAuthState', '4. startSubmit')
    const emitCheckEmailAction = { type: SOCKET_EMIT, payload: checkEmailAction }
    console.log('watchAuthState', '5. emitCheckEmailAction', emitCheckEmailAction)
    const test = yield put(emitCheckEmailAction)
    console.log('watchAuthState', '6. yield put(emitCheckEmailAction)', test)
    yield take(checkEmailActionSuccessType)
    console.log('watchAuthState', '7. yield take(successType)', checkEmailActionSuccessType)
    yield put(stopSubmit('login'))

    console.log('watchAuthState', '8. create or login')
    const authAction = yield take([CREATE_USER_REQUESTED, AUTHENTICATE_REQUESTED])
    console.log('watchAuthState', '9. authAction', authAction)
    const { successType: authActionSuccessType } = authAction.payload
    console.log('watchAuthState', '10. successType', authActionSuccessType)
    yield put(startSubmit('login'))
    console.log('watchAuthState', '11. startSubmit')
    const emitAuthAction = { type: SOCKET_EMIT, payload: authAction }
    console.log('watchAuthState', '12. emitAuthAction', emitAuthAction)
    const test2 = yield put(emitAuthAction)
    console.log('watchAuthState', '11. yield put(emitAuthAction)', test2)
    yield take(authActionSuccessType)
    console.log('watchAuthState', '12. yield take(successType)', authActionSuccessType)
    yield put(stopSubmit('login'))
  }
}
