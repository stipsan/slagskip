import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
  RECEIVE_NETWORK_OFFLINE,
  RECEIVE_NETWORK_ONLINE,
} from '../constants/ActionTypes'
import { connect } from '../socket'

export const connectSocket = () => {
  return { type: SOCKET_REQUEST }
}
/*
export const connectSocket = () => {
  return dispatch => {
    connect(
      () => dispatch({ type: SOCKET_CONNECTED }),
      message => dispatch({ type: SOCKET_DISCONNECTED, message })
    );
  }
}
//*/