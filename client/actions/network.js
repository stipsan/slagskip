import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from '../constants/ActionTypes'
import { connect } from '../socket'

export const connectSocket = () => {
  return dispatch => {
    connect(
      () => dispatch({ type: SOCKET_CONNECTED }),
      message => dispatch({ type: SOCKET_DISCONNECTED, message })
    );
  }
}