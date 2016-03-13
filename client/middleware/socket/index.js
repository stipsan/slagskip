//@TODO make this a reusable middleware tailored socketcluster?
import { 
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
} from '../constants/ActionTypes'
import { connect } from './connect'

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_SOCKET = Symbol('Call ClusterSocket')

// A Redux middleware that interprets actions with CALL_SOCKET info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  
  const socket = connect(store, next, action);
  // no socket means we're still setting it up, proceed the stack while we wait
  // @TODO queue actions while waiting for connect?
  if(!socket) {
    return next(action)
  }
  
  if(action.type === SUBSCRIBE_REQUEST) {
    console.error('works');
  }
  
  const callSocket = action[CALL_SOCKET]
  if (typeof callSocket === 'undefined') {
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

  return socket.emit(requestType, emitData, (err, data) => {
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