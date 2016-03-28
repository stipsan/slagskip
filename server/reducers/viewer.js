import {
  RECEIVE_VIEWER,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  friendIds: [],
  invites: []
})

export const viewer = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_VIEWER:
    return state.merge({
      friendIds: action.friendIds,
      invites: action.invites,
    })
  default:
    return state
  }
}