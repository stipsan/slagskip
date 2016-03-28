import {
  AUTHENTICATE_SUCCESS,
  RECEIVE_AUTHENTICATE,
  RECEIVE_VIEWER,
  DEAUTHENTICATE_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  id: null,
  username: '',
  isLoaded: false,
})

export const viewer = (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE_SUCCESS:
    return state.merge({
      id: action.authToken.id,
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
      username: ''
    })
  default:
    return state
  }
}