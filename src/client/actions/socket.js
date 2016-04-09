import { SOCKET_RECONNECT } from '../constants/ActionTypes'

export const reconnectSocket = () => {
  return { type: SOCKET_RECONNECT }
}