import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../../constants/ActionTypes'
import {
  loginUser
} from '../../actions'
import { attachListeners } from './listeners'
import { subscribeChannels } from './channel'
import { maybeAuthenticate, maybeDeauthenticate } from './authenticate'

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
      console.info('connect', data)
      // yay! lets memoize the socket
      memoizedSocket = socket
      pendingConnection = false
      
      const authToken = socket.getAuthToken()
      const channels = authToken && authToken.channels || undefined
      subscribeChannels(store, next, action, socket, channels)
      
      next({ type: SOCKET_SUCCESS, ...data })
      if(socket.authToken) {
        console.warn('can login user')
        
        callSocket(store, next, loginUser(socket.authToken.username), socket)
      }
    })
    
    // @TODO put behind debug flag
    global.socket = socket
  }
  
  return memoizedSocket
}