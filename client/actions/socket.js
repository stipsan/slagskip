import { SOCKET_CONNECTED } from '../constants/ActionTypes'

export const connectSocket = () => {
  return { type: SOCKET_CONNECTED }
}