//@TODO make this a reusable middleware tailored socketcluster?
import socketCluster from 'socketcluster-client'
import { 
  SOCKET_REQUEST,
  SOCKET_SUCCESS,
  SOCKET_FAILURE,
} from '../constants/ActionTypes'

// if connecting went well, we store the socket instance here
let memoizedSocket;

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_SOCKET = Symbol('Call ClusterSocket')

// A Redux middleware that interprets actions with CALL_SOCKET info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  // initial setup
  if(action.type === SOCKET_REQUEST) {
    const socket = socketCluster.connect()
    
    socket.on('connect', data => {
      // yay! lets memoize the socket
      memoizedSocket = socket
      next({ type: SOCKET_SUCCESS, ...data })
    })
    socket.on('error', data => {
      next({ type: SOCKET_FAILURE, event: 'error', ...data })
    })
    socket.on('connectAbort', () => {
      next({ type: SOCKET_FAILURE, event: 'connectAbort' })
    })    

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
      console.log('socket.emit', failureType, emitData, err, data);
      // Failed to emit event, retry or let the user know and keep going?
    } else {
      // Event was emitted successfully
      console.log('socket.emit', successType, emitData, err, data);
    }
  })
  
  return callSocket(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}