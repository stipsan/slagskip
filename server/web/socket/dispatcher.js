import {
  LOGIN_REQUEST,
} from '../../constants/ActionTypes'
import {
  loginRequest,
} from '../../actions'

const mapTypeToAction = {
  [LOGIN_REQUEST]: loginRequest,
}

export const createDispatcher = (socket, database, redis) => {
  const handleDispatch = ({ type, ...action }, callback) => {
    return store.dispatch(mapTypeToAction[type](action, callback, socket, database, redis))
  }

  socket.on('dispatch', handleDispatch)

  // pass the handler so it can be used in socket.off('dispatch') in the caller
  return handleDispatch
}