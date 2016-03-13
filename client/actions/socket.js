import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../constants/ActionTypes'

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