import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../constants/ActionTypes'

let memoizedSocket    = false
let pendingConnection = false

export const connect = (store, next, action) => {
  // initial setup
  if(!memoizedSocket && !pendingConnection && action.type === SOCKET_REQUEST) {
    pendingConnection = true
    const socket = socketCluster.connect({ autoReconnect: true })
    
    socket.on('connect', data => {
      // yay! lets memoize the socket
      memoizedSocket = socket
      pendingConnection = false
      next({ type: SOCKET_SUCCESS, ...data })
      
      // @TODO move this functionality further up the tree, add new constant to deal with subscribes
      const id          = data.id
      const userChannel = socket.subscribe(`user:${id}`)
      // This acts essentially like a proxy for the server to dispatch redux actions
      // on the client directly
      // @TODO add server middleware to keep this channel private, for security
      //       or else anyone can trigger anything in other user sessions
      userChannel.watch(action => next(action))
      
      // intended for global redux actions that announce server maintenance, etc
      // @TODO safeguard what can be passed in the public channel
      // @TODO responding to 'friends' events, a friend coming online etc will be moved
      //       to the private userChannel later
      // @TODO everyone can listen to this socket, but only server can publish to it
      const serviceChannel = socket.subscribe('service');
      serviceChannel.watch(action => next(action))
    })
    socket.on('error', data => {
      next({ type: SOCKET_FAILURE, event: 'error', ...data })
    })
    socket.on('connectAbort', () => {
      next({ type: SOCKET_FAILURE, event: 'connectAbort' })
    })
    socket.on('kickOut', (...args) => {
      console.warn('kickOut', ...args);
    })
    socket.on('subscribe', (...args) => {
      console.warn('subscribe', ...args);
    })
    socket.on('subscribeFail', (...args) => {
      console.warn('subscribeFail', ...args);
    })
    socket.on('unsubscribe', (...args) => {
      console.warn('unsubscribe', ...args);
    })
    socket.on('subscribeStateChange', (...args) => {
      console.warn('subscribeStateChange', ...args);
    })
    socket.on('subscribeRequest', (...args) => {
      console.warn('subscribeRequest', ...args);
    })
    
    // @TODO put behind debug flag
    global.socket = socket

    return memoizedSocket
  }
}