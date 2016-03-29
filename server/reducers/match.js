import {
  LOAD_GAME_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  
})

export const match = (state = initialState, { type, ...action }) => {
  switch (type) {
  case LOAD_GAME_SUCCESS:
    return state.merge(action)
  default:
    return state
  }
}