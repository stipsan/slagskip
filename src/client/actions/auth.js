import {
  AUTHENTICATE_REQUESTED,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  DEAUTHENTICATE_REQUESTED,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const signInWithEmailAndPassword = credentials => ({
  type: AUTHENTICATE_REQUESTED,
  payload: {
    successType: AUTHENTICATE_SUCCESS,
    failureType: AUTHENTICATE_FAILURE,
    credentials,
  },
})

export const logoutUser = () => ({
  [CALL_SOCKET]: {
    types: [DEAUTHENTICATE_REQUESTED, DEAUTHENTICATE_SUCCESS, DEAUTHENTICATE_FAILURE],
  }
})

export const checkIfEmailExists = form => ({
  type: CHECK_EMAIL_EXISTS_REQUESTED,
  payload: {
    successType: CHECK_EMAIL_EXISTS_SUCCESS,
    failureType: CHECK_EMAIL_EXISTS_FAILURE,
    email: form.get('email'),
  }
})

export const createUserWithEmailAndPassword = credentials => ({
  type: CREATE_USER_REQUESTED,
  payload: {
    successType: CREATE_USER_SUCCESS,
    failureType: CREATE_USER_FAILURE,
    credentials,
  },
})
