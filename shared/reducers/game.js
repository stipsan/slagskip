import {
  LOAD_GAME_REQUEST,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  PLACE_CROSSHAIRS,
} from '../constants/ActionTypes'
import { fromJS } from 'immutable'

const initialState = fromJS({
  id: null,
  versus: null,
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
  gameState: 'standby' // loading | failed | setup | waiting | ready | victory | defeat
})
export const game = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_GAME_REQUEST:
    return state
      .set('id', action.id)
      .set('gameState', 'loading')
  case LOAD_GAME_FAILURE:
    return state
      .set('gameState', 'failed')
  case LOAD_GAME_SUCCESS:
    return state
      .merge({
        versus: action.versus,
        gameState: action.gameState,
        board: action.board,
      })
  default:
    return state
  }
}