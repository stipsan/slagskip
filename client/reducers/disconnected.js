import * as TYPE from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

export const disconnected = (state = false, action) => {
  switch (action.type) {
  case TYPE.SOCKET_SUCCESS:
    return false
  case TYPE.SOCKET_FAILURE:
    return true
  default:
    return state
  }
}