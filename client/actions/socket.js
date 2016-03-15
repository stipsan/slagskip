import { SOCKET_REQUEST, SOCKET_RECONNECT } from '../constants/ActionTypes'

// client/middleware/socket.js knows what to do
export const connectSocket = () => {
  return { type: SOCKET_REQUEST }
}

export const reconnectSocket = () => {
  return { type: SOCKET_RECONNECT }
}