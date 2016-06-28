import { Map as ImmutableMap } from 'immutable'

import {
  LOAD_GAME_SUCCESS,
} from '../constants/ActionTypes'

const initialState = ImmutableMap({
  hits: []
})

export const match = (state = initialState, { type, payload }) => {
  switch (type) {
  case LOAD_GAME_SUCCESS:
    return state.merge(payload)
  // case FIRE_CANNON_SUCCESS:
    // nothing to do here
    // return state.updateIn(['hits'], hits => hits.push(action.hit))
  default:
    return state
  }
}
