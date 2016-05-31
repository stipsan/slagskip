import { fork, call, take, put } from 'redux-saga/effects'

import {
  AUTHENTICATE_REQUESTED,
  CREATE_USER_REQUESTED,
  CREATE_USER_FAILURE,
} from '../constants/ActionTypes'

export function *watchAuthState() {
  console.log('Watching auth state')
  while (true) { // eslint-disable-line no-constant-condition
    console.log('Sleeping')
    const { payload: credentials } = yield take(AUTHENTICATE_REQUESTED)
    yield fork(createUser, credentials)
  }
}

export function *createUser(credentials) {
  try {
    yield put({ type: CREATE_USER_REQUESTED, credentials })
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, error })
  }
}
