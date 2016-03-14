import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../../constants/ActionTypes'
import {
  loginUser
} from '../../actions'

let memoizedSocket    = false
let pendingConnection = false

export const connect = (store, next, action) => {
  // initial setup
  if(!memoizedSocket && !pendingConnection && action.type === SOCKET_REQUEST) {
    pendingConnection = true
    const socket = socketCluster.connect({ 
      autoReconnect: true,
      rejectUnauthorized: 'production' === process.env.NODE_ENV,
    })
    
    socket.on('connect', data => {
      // yay! lets memoize the socket
      memoizedSocket = socket
      pendingConnection = false
      next({ type: SOCKET_SUCCESS, ...data })
      if(socket.authToken) {
        next(loginUser(socket.authToken.username))
      }
    })
    socket.on('error', data => {
      next({ type: SOCKET_FAILURE, event: 'error', ...data })
    })
    socket.on('connectAbort', () => {
      next({ type: SOCKET_FAILURE, event: 'connectAbort' })
    })
    socket.on('authenticate', (...args) => {
      console.warn('authenticate', ...args);
    })
    socket.on('deauthenticate', (...args) => {
      console.warn('deauthenticate', ...args);
    })
    
    // @TODO put behind debug flag
    global.socket = socket
  }
  
  return memoizedSocket
}