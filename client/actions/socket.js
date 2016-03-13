import { SOCKET_REQUEST } from '../constants/ActionTypes'

// client/middleware/socket.js knows what to do
export const connectSocket = () => {
  return { type: SOCKET_REQUEST }
}