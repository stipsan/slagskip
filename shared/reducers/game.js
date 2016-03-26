import {
  LOAD_GAME_REQUEST,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  PLACE_CROSSHAIRS,
} from '../constants/ActionTypes'
import { fromJS } from 'immutable'

const initialState = fromJS({
  id: null,
  opponent: null,
  board: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  turns: [],
  scores: [0, 0],
  gameState: 'loading' // loading | failed | setup | waiting | ready | victory | defeat
})
export const game = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_GAME_REQUEST:
    return state
      .set('id', action.id)
      .set('gameState', 'loading')
  default:
    return state
  }
}