import { CALL_SOCKET } from '../middleware/socket'
import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/ActionTypes'

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loginUser(username) {
  return {
    [CALL_SOCKET]: {
      types: [ AUTHENTICATE_REQUEST, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE ],
      data: {
        username: username,
      },
    },
  }
}

export function logoutUser() {
  return { 
    [CALL_SOCKET]: {
      types: [ LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE ],
    },
  }
}