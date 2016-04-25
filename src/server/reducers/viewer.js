import { Map as ImmutableMap } from 'immutable'

import {
  RECEIVE_VIEWER,
} from '../constants/ActionTypes'

const initialState = ImmutableMap({
  friendIds: [],
  invites: [],
  games: [],
})

export const viewer = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_VIEWER:
    return state.merge({
      friendIds: action.friendIds,
      invites: action.invites,
      games: action.games,
    })
  default:
    return state
  }
}
