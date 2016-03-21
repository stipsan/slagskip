import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  username: '',
  isAuthenticated: false
})

export const viewer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return state.merge({
      isAuthenticated: true,
      username: action.username
    })
  case LOGOUT_SUCCESS:
    return state.merge({
      isAuthenticated: false,
      username: ''
    })
  default:
    return state
  }
}