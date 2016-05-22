import {
  AUTHENTICATE_REQUESTED,
  DEAUTHENTICATE_REQUESTED,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
  CREATE_USER_REQUESTED,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const signInWithEmailAndPassword = credentials => ({
  type: AUTHENTICATE_REQUESTED,
  payload: credentials,
})

export const logoutUser = () => ({
  [CALL_SOCKET]: {
    types: [DEAUTHENTICATE_REQUESTED, DEAUTHENTICATE_SUCCESS, DEAUTHENTICATE_FAILURE],
  }
})

export const createUserWithEmailAndPassword = credentials => ({
  type: CREATE_USER_REQUESTED,
  payload: credentials,
})
