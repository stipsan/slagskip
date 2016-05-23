import { fork, call, take, put } from 'redux-saga/effects'

import {
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../constants/ActionTypes'
import { emit } from './socket'

export function *watchAuthState() {
  console.log('Hello Sagas!') // eslint-disable-line
}

export function *createUser(credentials) {
  try {
    yield call(emit, CREATE_USER_REQUESTED, credentials)
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, error })
  }
}

export function *watchUserCreate() {
  console.log('Watching user signup') // eslint-disable-line
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: credentials } = yield take(CREATE_USER_REQUESTED)
    yield fork(createUser, credentials)
  }
}
