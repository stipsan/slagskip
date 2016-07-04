import { Map as ImmutableMap } from 'immutable'

import {
  SOCKET_SUCCESS,
  RECEIVE_AUTH_STATE_CHANGE,
  AUTHENTICATE_FAILURE,
  RECEIVE_DEAUTHENTICATE,
  DEAUTHENTICATE_SUCCESS,
  AUTHENTICATE_REQUESTED,
  AUTHENTICATE_SUCCESS,
  CHECK_EMAIL_EXISTS_REQUESTED,
  CHECK_EMAIL_EXISTS_SUCCESS,
} from '../constants/ActionTypes'

// state can be authenticated, pending or unauthenticated

const initialState = ImmutableMap({
  isAuthenticated: false,
  authState: 'unauthenticated',
  doesEmailExist: null,
  authToken: null
})

export const auth = (state = initialState, action) => {
  switch (action.type) {
  case SOCKET_SUCCESS:
    return state.merge({
      isAuthenticated: action.payload.isAuthenticated,
      authState: action.payload.isAuthenticated ? 'pending' : 'unauthenticated',
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
  case AUTHENTICATE_FAILURE:
  case RECEIVE_DEAUTHENTICATE:
  case DEAUTHENTICATE_SUCCESS:
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
      authToken: action.payload.authToken,
    })
  case CHECK_EMAIL_EXISTS_REQUESTED:
    return state.merge({
      authState: 'emailcheck',
    })
  case CHECK_EMAIL_EXISTS_SUCCESS:
    return state.merge({
      doesEmailExist: Boolean(action.payload.doesEmailExist),
    })
  default:
    return state
  }
}
