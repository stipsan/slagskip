import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  DEAUTHENTICATE_REQUEST,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const signInWithEmailAndPassword = credentials => ({
  [CALL_SOCKET]: {
    types: [AUTHENTICATE_REQUEST, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE],
    data: {
      credentials,
    }
  }
})

export const logoutUser = () => ({
  [CALL_SOCKET]: {
    types: [DEAUTHENTICATE_REQUEST, DEAUTHENTICATE_SUCCESS, DEAUTHENTICATE_FAILURE],
  }
})

export const createUserWithEmailAndPassword = credentials => ({
  [CALL_SOCKET]: {
    types: [AUTHENTICATE_REQUEST, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE],
    data: {
      credentials,
    }
  }
})
