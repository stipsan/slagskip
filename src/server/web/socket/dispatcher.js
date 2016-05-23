import createStore from '../../store'
import { actions } from './actions'

export const createDispatcher = (socket, database, redis) => {
  const store = createStore(socket, database, redis)

  const handleDispatch = ({ type, ...action }, callback) => {
    // action does not exist as a thunk, pass it to the sagas
    if (!actions.hasOwnProperty(type)) {
      // send a ping back so the client knows the request is queued
      callback()
      return store.dispatch({ type, ...action })
    }
    return store.dispatch(actions[type](action, callback, socket, database, redis))
  }

  socket.on('dispatch', handleDispatch)

  // pass the handler so it can be used in socket.off('dispatch') in the caller
  return handleDispatch
}
