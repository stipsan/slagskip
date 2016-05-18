import { Map as ImmutableMap } from 'immutable'

import {
  AUTHENTICATE_SUCCESS,
  RECEIVE_VIEWER,
  DEAUTHENTICATE_SUCCESS,
} from '../constants/ActionTypes'

const initialState = ImmutableMap({
  id: null,
  username: '',
  email: '',
  isLoaded: false,
})

export const viewer = (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE_SUCCESS:
    return state.merge({
      id: action.authToken.id,
      email: action.authToken.email,
      username: action.authToken.username
    })
  case RECEIVE_VIEWER:
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
