import {
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../constants/ActionTypes'

export const disconnected = (state = false, action) => {
  switch (action.type) {
  case SOCKET_SUCCESS:
    return false
  case SOCKET_FAILURE:
    return true
  default:
    return state
  }
}