import createStore from '../../store'
import { actions } from './actions'

export const createDispatcher = (socket, database, redis) => {
  const store = createStore()

  const handleDispatch = ({ type, ...action }, callback) => {
    if (!actions.hasOwnProperty(type)) {
      console.error(`Action type ${type} does not exist!`)
      return callback(404, `Action type ${type} does not exist!`)
    }

    return store.dispatch(actions[type](action, callback, socket, database, redis))
  }

  socket.on('dispatch', handleDispatch)

  // pass the handler so it can be used in socket.off('dispatch') in the caller
  return handleDispatch
}
