import { fork, call, take, put } from 'redux-saga/effects'

import {
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../constants/ActionTypes'
import { emit } from './socket'

export function *createUser(credentials, socket, database, redis) {
  try {
    console.log('createUser', credentials)
    const userData = yield call(database.createUser, credentials, redis)
    yield put({ type: CREATE_USER_SUCCESS, userData })
    yield call(emit, socket, CREATE_USER_REQUESTED, credentials)
  } catch (error) {
    console.log('createUser error', error)
    yield put({ type: CREATE_USER_FAILURE, error })
    yield call(emit, socket, CREATE_USER_FAILURE, { error: error.message })
  }
}

export function *watchUserCreate(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const result = yield take(CREATE_USER_REQUESTED)
    console.log('yield result', result)
    yield fork(createUser, result, socket, database, redis)
  }
}
