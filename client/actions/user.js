import { CALL_SOCKET } from '../middleware/socket'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/ActionTypes'

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loginUser(username) {
  return {
    [CALL_SOCKET]: {
      types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
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