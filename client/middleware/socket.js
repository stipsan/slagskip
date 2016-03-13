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

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  
  console.log('socket middleware', action)
  if(action.type === SOCKET_REQUEST) {
    console.log('oh dude!')
    console.log('memoizedSocket first attempt', memoizedSocket);
    const socket = socketCluster.connect()
    /*connect(
      () => dispatch({ type: SOCKET_CONNECTED }),
      message => dispatch({ type: SOCKET_DISCONNECTED, message })
    );*/
    socket.on('connect', () => {
      // yay! lets memoize the socket
      memoizedSocket = socket
      next({ type: SOCKET_FAILURE })
      next({ type: SOCKET_SUCCESS })
    })
    console.log('memoizedSocket second attempt', memoizedSocket);
    setTimeout(() => {
      console.log('memoizedSocket third attempt', memoizedSocket);
    }, 5000);
    //socket.on('error', failure)
    
    return next(action)
    
    return next({ ...action, type: SOCKET_FAILURE });
  }
  
  const callAPI = action[CALL_SOCKET]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema).then(
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