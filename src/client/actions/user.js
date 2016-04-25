import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  DEAUTHENTICATE_REQUEST,
  DEAUTHENTICATE_SUCCESS,
  DEAUTHENTICATE_FAILURE,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const loginUser = username => ({
  [CALL_SOCKET]: {
    types: [AUTHENTICATE_REQUEST, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAILURE],
    data: {
      username,
    }
  }
})

export const logoutUser = () => ({
  [CALL_SOCKET]: {
    types: [DEAUTHENTICATE_REQUEST, DEAUTHENTICATE_SUCCESS, DEAUTHENTICATE_FAILURE],
  }
})
