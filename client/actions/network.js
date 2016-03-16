import { 
  RECEIVE_NETWORK_OFFLINE,
  RECEIVE_NETWORK_ONLINE,
  SOCKET_RECONNECT,
} from '../constants/ActionTypes'

export const reconnectSocket = () => {
  return { type: SOCKET_RECONNECT }
}