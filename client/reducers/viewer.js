import * as TYPE from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

export const viewer = (state = {username: '', isAuthenticated: false}, action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      username: action.username,
    }
  case TYPE.LOGOUT_SUCCESS:
    return {
      ...state,
      isAuthenticated: false,
      username: '',
    }
  default:
    return state
  }
}