import * as TYPE from '../constants/ActionTypes'
import {
  LOCATION_CHANGE
} from 'react-router-redux'
import { Map as ImmutableMap } from 'immutable'

// state can be authenticated, pending or unauthenticated

const initialState = ImmutableMap({
  isAuthenticated: false,
  authState: 'unauthenticated',
  authToken: null,
  redirectAfterLogin: '/',
})

export const auth = (state = initialState, action) => {
  switch (action.type) {
  case TYPE.SOCKET_SUCCESS:
    return state.merge({
      isAuthenticated: action.isAuthenticated,
      authState: action.isAuthenticated ? 'authenticated' : 'unauthenticated',
    })
  case TYPE.RECEIVE_AUTH_STATE_CHANGE:
    return state.merge({
      isAuthenticated: action.newState === 'authenticated',
      authState: action.newState,
      authToken: action.authToken,
    })
  case LOCATION_CHANGE:
    return state.merge({
      redirectAfterLogin: action.payload.state && action.payload.state.redirectAfterLogin,
    })
  case TYPE.LOGIN_FAILURE:
  case TYPE.RECEIVE_DEAUTHENTICATE:
    return state.merge({
      isAuthenticated: false,
      authState: 'unauthenticated',
      authToken: null,
    })
  case TYPE.LOGIN_REQUEST:
    return state.merge({
      authState: 'pending',
    })
  case TYPE.LOGIN_SUCCESS:
    return state.merge({
      authState: 'authenticated',
      isAUthenticated: true,
      authToken: action.authToken,
    })
  default:
    return state
  }
}