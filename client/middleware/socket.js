//@TODO make this a reusable middleware tailored socketcluster?
import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../constants/ActionTypes'

// if connecting went well, we store the socket instance here
let memoizedSocket

let pendingConnection = false

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_SOCKET = Symbol('Call ClusterSocket')

// A Redux middleware that interprets actions with CALL_SOCKET info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  // initial setup
  if(!pendingConnection && action.type === SOCKET_REQUEST) {
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
    
    global.socket = socket;

    return next(action)    
  }
  
  // @TODO when CALL_SOCKET happens before SOCKET_SUCCESS did and memoizedSocket doesn't exist
  const callSocket = action[CALL_SOCKET]
  if (typeof callSocket === 'undefined' || !memoizedSocket) {
    return next(action)
  }

  const { types, data: emitData } = callSocket

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_SOCKET]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return memoizedSocket.emit(requestType, emitData, (err, data) => {
    console.log('socket.emit', requestType, emitData, err, data);
    if (err) {
      // Failed to emit event, retry or let the user know and keep going?
      next(actionWith({
        type: failureType,
        error: {type: err, message: data || 'Something bad happened'}
      }))
    } else {
      next(actionWith({
        ...data,
        type: successType
      }))
    }
  })
}