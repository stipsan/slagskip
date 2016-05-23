import {
  signInWithEmailAndPassword,
} from '../../actions'
import {
  SOCKET_REQUESTED,
  SOCKET_SUCCESS,
} from '../../constants/ActionTypes'
import { subscribeChannels } from './channel'
import { attachListeners } from './listeners'

const socketCluster = global.WebSocket ? require('socketcluster-client') : false

let memoizedSocket = false
let pendingConnection = false

export const connect = (store, next, action, callSocket) => {
  // initial setup
  if (socketCluster && !memoizedSocket && !pendingConnection && action.type === SOCKET_REQUESTED) {
    pendingConnection = true
    const socket = socketCluster.connect({
      hostname: process.env.SOCKET_HOSTNAME || location.hostname,
      autoReconnect: true,
      autoReconnectOptions: process.env.AUTO_RECONNECT_OPTIONS,
    })

    attachListeners(store, next, action, socket, callSocket)

    socket.on('connect', data => {
      // yay! lets memoize the socket
      memoizedSocket = socket
      pendingConnection = false

      const authToken = socket.getAuthToken()
      if (authToken && authToken.privateChannel) {
        subscribeChannels(store, next, action, socket, [authToken.privateChannel])
      }

      if (socket.authToken) {
        callSocket(store, next, signInWithEmailAndPassword(socket.authToken), socket)
      }

      return next({ type: SOCKET_SUCCESS, ...data, socket })
    })

    socket.on('authenticate', () => {
      subscribeChannels(store, next, action, socket, [socket.getAuthToken().privateChannel])

      if ('ga' in global) {
        global.ga('set', 'userId', socket.getAuthToken().id)
      }
      if ('rg4js' in global) {
        global.rg4js('setUser', {
          identifier: socket.getAuthToken().id,
          isAnonymous: false,
          email: socket.getAuthToken().email,
          firstName: socket.getAuthToken().username,
        })
      }
    })

    socket.on('dispatch', (dispatchAction, callback) => {
      next(dispatchAction)
      return callback()
    })
  }

  return memoizedSocket
}
