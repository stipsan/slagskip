import { socketEmit } from 'redux-saga-sc'
import { fork, call, take, put } from 'redux-saga/effects'

import {
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  AUTHENTICATE_REQUESTED,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
} from '../constants/ActionTypes'

export function *authenticate(credentials, socket, database, redis) { // eslint-disable-line

  try {
    const authToken = yield call(database.authenticate, credentials, redis)
    yield put(socketEmit({ type: AUTHENTICATE_SUCCESS, payload: { authToken } }))
    yield call([socket, socket.setAuthToken], authToken)
  } catch (error) {
    yield put(socketEmit({ type: AUTHENTICATE_FAILURE, payload: {
      error: error.message
    } }))
  }
}

export function *createUser(credentials, socket, database, redis) {
  try {
    console.log('createUser', credentials)
    const userData = yield call(database.createUser, credentials, redis)
    console.log('userData', userData)
    yield put(socketEmit({ type: CREATE_USER_SUCCESS, payload: { userData } }))
    yield call(authenticate, credentials, socket, database, redis)
  } catch (error) {
    yield put(socketEmit({ type: CREATE_USER_FAILURE, payload: {
      error: error.message
    } }))
  }
}

export function *watchUserCreate(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { credentials } } = yield take(CREATE_USER_REQUESTED)
    yield fork(createUser, credentials, socket, database, redis)
  }
}

export function *watchAuthenticateRequest(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { credentials } } = yield take(AUTHENTICATE_REQUESTED)
    yield fork(authenticate, credentials, socket, database, redis)
  }
}

export function *checkEmailExist(email, socket, database, redis) {
  try {
    const doesEmailExist = yield call(database.checkEmailExist, email, redis)
    yield put(socketEmit({ type: CHECK_EMAIL_EXISTS_SUCCESS, payload: {
      doesEmailExist
    } }))
  } catch (error) {
    yield put(socketEmit({ type: CHECK_EMAIL_EXISTS_FAILURE, payload: {
      error: error.message
    } }))
  }
}

export function *watchCheckEmailExistRequest(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { email } } = yield take(CHECK_EMAIL_EXISTS_REQUESTED)
    yield fork(checkEmailExist, email, socket, database, redis)
  }
}
