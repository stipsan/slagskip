import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
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
      authTokenName: process.env.AUTH_TOKEN_NAME || 'authToken',
    })
    
    attachListeners(store, next, action, socket, callSocket)
    
    socket.on('connect', data => {
      // yay! lets memoize the socket
      memoizedSocket = socket
      pendingConnection = false
      
      const authToken = socket.getAuthToken()
      const channels = authToken && authToken.channels || undefined
      if(authToken && authToken.privateChannel) subscribeChannels(store, next, action, socket, [authToken.privateChannel])
      
      next({ type: SOCKET_SUCCESS, ...data, socket })
      if(socket.authToken) {        
        callSocket(store, next, loginUser(socket.authToken.username), socket)
      }
    })
    
    socket.on('authenticate', () => {
      subscribeChannels(store, next, action, socket, [socket.getAuthToken().privateChannel])
      
      if('ga' in global) {
        global.ga('set', 'userId', socket.getAuthToken().id); 
      }
      if('rg4js' in global) {
        global.rg4js('setUser', {
          identifier: socket.getAuthToken().id,
          isAnonymous: false,
          firstName: socket.getAuthToken().username,
        })
      }
    })
    
    socket.on('dispatch', action => next(action))
  }
  
  return memoizedSocket
}