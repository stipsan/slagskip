import {
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
} from '../constants/ActionTypes'
import { fromJS } from 'immutable'

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
