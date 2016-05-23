import { fork, call, take, put, cancelled } from 'redux-saga/effects'

import {
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  AUTHENTICATE_REQUESTED,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
} from '../constants/ActionTypes'
import { emit } from './socket'

export function *createUser(credentials, socket, database, redis) {
  try {
    const userData = yield call(database.createUser, credentials, redis)
    yield call(emit, socket, CREATE_USER_SUCCESS, userData)
  } catch (error) {
    yield call(emit, socket, CREATE_USER_FAILURE, { error: error.message })
  }
}

export function *watchUserCreate(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const result = yield take(CREATE_USER_REQUESTED)
    yield fork(createUser, result, socket, database, redis)
  }
}

export function *authenticate(credentials, socket, database, redis) { // eslint-disable-line
  try {
    const authToken = yield call(database.authenticate, credentials, redis)
    yield put({ type: AUTHENTICATE_SUCCESS, authToken })
    yield call(socket.setAuthToken, authToken)
    return authToken
  } catch (error) {
    yield put({ type: AUTHENTICATE_FAILURE, error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function *watchAuthenticateRequest(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const result = yield take(AUTHENTICATE_REQUESTED)
    yield fork(authenticate, result, socket, database, redis)
  }
}
