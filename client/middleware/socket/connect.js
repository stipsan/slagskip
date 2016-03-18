/*eslint no-console: 1 */
import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../../constants/ActionTypes'
import {
  loginUser,
} from '../../actions'
import { attachListeners } from './listeners'
import { subscribeChannels } from './channel'

let memoizedSocket    = false
let pendingConnection = false

export const connect = (store, next, action, callSocket) => {
  // initial setup
  if(!memoizedSocket && !pendingConnection && action.type === SOCKET_REQUEST) {
    pendingConnection = true
    const socket = socketCluster.connect({
      hostname: process.env.SOCKET_HOSTNAME || location.hostname,
      path: process.env.SOCKET_PATH || '/ws',
      autoReconnect: true,
      autoReconnectOptions: process.env.AUTO_RECONNECT_OPTIONS,
      authTokenName: 'authToken',
    })
    
    attachListeners(store, next, action, socket, callSocket)
    
    socket.on('connect', data => {
      if('production' !== process.env.NODE_ENV) console.log('connect', data)
      // yay! lets memoize the socket
      memoizedSocket = socket
      pendingConnection = false
      
      const authToken = socket.getAuthToken()
      const channels = authToken && authToken.channels || undefined
      subscribeChannels(store, next, action, socket, channels)
      
      next({ type: SOCKET_SUCCESS, ...data })
      if(socket.authToken) {
        if('production' !== process.env.NODE_ENV) console.log('can login user')
        
        callSocket(store, next, loginUser(socket.authToken.username), socket)
      }
    })
  }
  
  return memoizedSocket
}