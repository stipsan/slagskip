import {
  AUTHENTICATE_REQUESTED,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  DEAUTHENTICATE_REQUESTED,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
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
  [CALL_SOCKET]: {
    types: [AUTHENTICATE_REQUESTED, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE],
    data: {
      credentials,
    }
  }
})
