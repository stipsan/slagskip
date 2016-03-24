import {
  AUTHENTICATE_SUCCESS,
  RECEIVE_AUTHENTICATE,
  LOGOUT_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  username: '',
  isAuthenticated: false
})

export const viewer = (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE_SUCCESS:
    return state.merge({
      isAuthenticated: true,
      username: action.authToken.username
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