import { fromJS } from 'immutable'

import {
  LOAD_GAME_SUCCESS,
} from '../constants/ActionTypes'

const initialState = fromJS({
  versus: null,
})

export const setup = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_GAME_SUCCESS:
    return state.merge({
      versus: action.versus,
    })
  default:
    return state
  }
}
