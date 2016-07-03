import { fromJS } from 'immutable'

import {
  LOAD_GAME_SUCCESS,
} from '../constants/ActionTypes'

const initialState = fromJS({
  versus: null,
})

export const setup = (state = initialState, { type, payload }) => {
  switch (type) {
  case LOAD_GAME_SUCCESS:
    return state.merge({
      versus: payload.versus,
    })
  default:
    return state
  }
}
