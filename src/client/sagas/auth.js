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
    console.log('connected')
    const checkEmailAction = yield take(CHECK_EMAIL_EXISTS_REQUESTED)
    const { successType } = checkEmailAction.payload
    yield put(startSubmit('login'))
    yield put(checkEmailAction)
    console.log('checkEmailAction', checkEmailAction)
    const test = yield call(handleEmit, checkEmailAction)
    console.log('CHECK_EMAIL_EXISTS_SUCCESS', test)

    yield put(stopSubmit('login'))
    const createUserAction = yield take(CREATE_USER_REQUESTED)
    yield put(startSubmit('login'))
    // const { payload: { email, exists } } = yield take(CHECK_EMAIL_EXISTS_SUCCESS)
    // console.log('results of the email check', email, exists)
    // const { payload: credentials } = yield take(AUTHENTICATE_REQUESTED)
    // yield fork(createUser, credentials)
  }
}
