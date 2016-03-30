import {
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
  SOCKET_DISCONNECT,
} from '../constants/ActionTypes'

export const pendingReconnect = (state = false, action) => {
  switch (action.type) {
  case SOCKET_SUCCESS:
    return false
  case SOCKET_DISCONNECT:
  case SOCKET_FAILURE:
    return action.socket.pendingReconnect &&
      action.socket.pendingReconnectTimeout &&
      action.socket.connectAttempts < 6 &&
      new Date().setTime(new Date().getTime() + action.socket.pendingReconnectTimeout)
      || false
  default:
    return state
  }
}