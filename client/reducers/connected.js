import * as TYPE from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

export const connected = (state = false, action) => {
  switch (action.type) {
  case TYPE.SOCKET_SUCCESS:
    return true
  default:
    return state
  }
}