import {
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
  SOCKET_DISCONNECT,
} from '../constants/ActionTypes'

export const disconnected = (state = false, { type }) => {
  switch (type) {
  case SOCKET_SUCCESS:
    return false
  case SOCKET_DISCONNECT:
  case SOCKET_FAILURE:
    return true
  default:
    return state
  }
}
