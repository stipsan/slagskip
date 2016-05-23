import { fork, call, take, put } from 'redux-saga/effects'

import {
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../constants/ActionTypes'

export function *createUser(credentials) {
  try {
    const token = yield call(emit, CREATE_USER_REQUESTED, credentials)
    yield put({ type: CREATE_USER_SUCCESS, token })
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, error })
  }
}

export function *watchUserCreate() {
  console.log('Watching user signup') // eslint-disable-line
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(CREATE_USER_REQUESTED)
    console.log('create user is requested')
    yield fork(createUser, payload)
  }
}
