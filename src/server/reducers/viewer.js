import { Map as ImmutableMap } from 'immutable'

import {
  RECEIVE_VIEWER,
  VIEWER_SUCCESS,
} from '../constants/ActionTypes'

const initialState = ImmutableMap({
  friendIds: [],
  invites: [],
  games: [],
})

export const viewer = (state = initialState, { type, payload }) => {
  switch (type) {
  case RECEIVE_VIEWER:
  case VIEWER_SUCCESS:
    return state.merge({
      friendIds: payload.friendIds,
      invites: payload.invites,
      games: payload.games,
    })
  default:
    return state
  }
}
