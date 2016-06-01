import { fork, call, take, put } from 'redux-saga/effects'

import {
  SOCKET_SUCCESS,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  AUTHENTICATE_REQUESTED,
  CREATE_USER_REQUESTED,
  CREATE_USER_FAILURE,
} from '../constants/ActionTypes'
import { emit, handleEmit } from './socket'

export function *watchAuthState() {
  console.log('Watching auth state')
  while (true) { // eslint-disable-line no-constant-condition
    console.log('waiting for connection')
    // @FIXME yield take(SOCKET_SUCCESS)
    console.log('connected')
    const checkEmailAction = yield take(CHECK_EMAIL_EXISTS_REQUESTED)

    console.log('checkEmailAction', checkEmailAction)
    const test = yield call(handleEmit, checkEmailAction, CHECK_EMAIL_EXISTS_SUCCESS, CHECK_EMAIL_EXISTS_FAILURE)
    console.log('CHECK_EMAIL_EXISTS_SUCCESS', test)
    // const { payload: { email, exists } } = yield take(CHECK_EMAIL_EXISTS_SUCCESS)
    // console.log('results of the email check', email, exists)
    // const { payload: credentials } = yield take(AUTHENTICATE_REQUESTED)
    // yield fork(createUser, credentials)
  }
}

export function *checkEmail(email) {
  try {
    yield call(emit, CREATE_USER_REQUESTED, credentials)
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, error })
  }
}

export function *createUser(credentials) {
  try {
    yield call(emit, CREATE_USER_REQUESTED, credentials)
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, error })
  }
}
