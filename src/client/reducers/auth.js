import { Map as ImmutableMap } from 'immutable'
import {
  LOCATION_CHANGE
} from 'react-router-redux'

import {
  SOCKET_SUCCESS,
  RECEIVE_AUTH_STATE_CHANGE,
  AUTHENTICATE_FAILURE,
  RECEIVE_DEAUTHENTICATE,
  AUTHENTICATE_REQUESTED,
  AUTHENTICATE_SUCCESS,
} from '../constants/ActionTypes'

// state can be authenticated, pending or unauthenticated

const initialState = ImmutableMap({
  isAuthenticated: false,
  authState: 'unauthenticated',
  authToken: null
})

export const auth = (state = initialState, action) => {
  switch (action.type) {
  case SOCKET_SUCCESS:
    return state.merge({
      isAuthenticated: action.isAuthenticated,
      authState: action.isAuthenticated ? 'authenticated' : 'unauthenticated',
    })
  case RECEIVE_AUTH_STATE_CHANGE:
    return state.merge({
      isAuthenticated: 'authenticated' === action.newState || (
        'pending' === action.newState &&
        'authenticated' === state.get('authState')
      ),
      authState: action.newState,
      authToken: action.authToken,
    })
  case LOCATION_CHANGE:
    return state.merge({
      redirectAfterLogin: action.payload.state && action.payload.state.redirectAfterLogin,
    })
  case AUTHENTICATE_FAILURE:
  case RECEIVE_DEAUTHENTICATE:
    return state.merge({
      isAuthenticated: false,
      authState: 'unauthenticated',
      authToken: null,
    })
  case AUTHENTICATE_REQUESTED:
    return state.merge({
      authState: 'pending',
    })
  case AUTHENTICATE_SUCCESS:
    return state.merge({
      authState: 'authenticated',
      isAuthenticated: true,
      authToken: action.authToken,
    })
  default:
    return state
  }
}
