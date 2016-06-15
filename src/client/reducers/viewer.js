import { Map as ImmutableMap } from 'immutable'

import {
  AUTHENTICATE_SUCCESS,
  RECEIVE_VIEWER,
  VIEWER_SUCCESS,
  DEAUTHENTICATE_SUCCESS,
} from '../constants/ActionTypes'

const initialState = ImmutableMap({
  id: null,
  username: '',
  email: '',
  isLoaded: false,
})

export const viewer = (state = initialState, { type, payload }) => {
  switch (type) {
  case AUTHENTICATE_SUCCESS:
    return state.merge({
      id: payload.authToken.id,
      email: payload.authToken.email,
      username: payload.authToken.username
    })
  case RECEIVE_VIEWER:
  case VIEWER_SUCCESS:
    return state.merge({
      isLoaded: true,
    })
  case DEAUTHENTICATE_SUCCESS:
    return state.merge({
      isLoaded: false,
      id: null,
      email: '',
      username: ''
    })
  default:
    return state
  }
}
