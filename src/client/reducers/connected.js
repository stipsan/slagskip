import {
  SOCKET_SUCCESS
} from '../constants/ActionTypes'

export const connected = (state = false, action) => {
  switch (action.type) {
  case SOCKET_SUCCESS:
    return true
  default:
    return state
  }
}