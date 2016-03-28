import {
  LOAD_GAME_REQUEST,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  RECEIVE_GAME,
  LOAD_ITEMS,
  PLACE_CROSSHAIRS,
} from '../constants/ActionTypes'
import { fromJS } from 'immutable'
import { board } from './board'

const initialState = fromJS({
  id: null,
  versus: null,
  versusGrid: [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  viewerBoard: board(undefined, {}),
  turns: [],
  isViewerFirst: null,
  isViewerTurn: false,
  gameState: 'standby', // loading | failed | setup | waiting | ready | victory | defeat
  reasonFailed: null,
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
      .set('reasonFailed', action.error.message)
  case LOAD_GAME_SUCCESS:
    return state
      .merge({
        id: action.id,
        versus: action.versus,
        viewerBoard: board(undefined, {
          type: LOAD_ITEMS, 
          board: {
            grid: action.viewerBoard
          }
        }),
        turns: action.turns,
        gameState: action.gameState,
        isViewerFirst: action.isViewerFirst,
        isViewerTurn: action.isViewerFirst,
      })
  default:
    return state
  }
}