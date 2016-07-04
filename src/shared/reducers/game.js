import { fromJS } from 'immutable'

import {
  NEW_GAME_REQUESTED,
  LOAD_GAME_REQUESTED,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  NEW_GAME_SUCCESS,
  LOAD_ITEMS,
  PLACE_CROSSHAIRS,
  RECEIVE_HIT,
  RECEIVE_MISS,
  SAVE_TURN_REQUESTED,
  SAVE_TURN_SUCCESS,
  JOIN_GAME_SUCCESS,
  SAVE_TURN_FAILURE,
} from '../constants/ActionTypes'
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
  viewerGrid: [
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
  // game states: standby | loading | failed | setup | waiting | ready | victory | defeat
  gameState: 'standby',
  reasonFailed: null,
  selectedCell: -1,
  viewerScore: 0,
  versusScore: 0,
})

export const game = (state = initialState, { type, payload }) => {
  switch (type) {
  case NEW_GAME_REQUESTED:
    return initialState.set('gameState', 'setup')
  case NEW_GAME_SUCCESS:
    return state
      .set('id', payload.id)
      .set('gameState', 'waiting')
  case JOIN_GAME_SUCCESS:
    return initialState
      .set('id', payload.id)
      .set('gameState', 'ready')
  case LOAD_GAME_REQUESTED:
    return initialState
      .set('id', payload.id)
      .set('gameState', 'loading')
  case LOAD_GAME_FAILURE:
    return state
      .set('gameState', 'failed')
      .set('reasonFailed', payload.error.message)
  case LOAD_GAME_SUCCESS:
    return state
      .merge({
        id: payload.id,
        versus: payload.versus,
        viewerBoard: board(undefined, {
          type: LOAD_ITEMS,
          board: {
            grid: payload.viewerBoard
          }
        }),
        turns: payload.turns || [],
        gameState: payload.gameState,
        isViewerFirst: payload.isViewerFirst,
        isViewerTurn: payload.isViewerFirst,
        viewerScore: payload.viewerScore,
        versusScore: payload.versusScore,
      })
      .update(updateState =>
        updateState.get('turns').reduce((previousState, turn) => {
          // Versus opponent moves
          if (turn.get('id') === updateState.get('versus')) {
            if (true === turn.get('hit')) {
              return previousState
                .set('isViewerTurn', false)
                .setIn(['viewerGrid', turn.get('index')], Number(turn.get('hit')))
            }
            return previousState
              .set('isViewerTurn', true)
              .setIn(['viewerGrid', turn.get('index')], Number(turn.get('hit')))
          }
          // Viewer moves
          if (true === turn.get('hit')) {
            return previousState
              .set('isViewerTurn', true)
              .setIn(['versusGrid', turn.get('index')], Number(turn.get('hit')))
          }
          return previousState
            .set('isViewerTurn', false)
            .setIn(['versusGrid', turn.get('index')], Number(turn.get('hit')))
        }, updateState)
      )
  case PLACE_CROSSHAIRS:
    return state.set('selectedCell', payload.selectedCell)
  case RECEIVE_MISS:
    if (payload.id !== state.get('id')) return state

    return state
      .set('isViewerTurn', true)
      .updateIn(['turns'], update => update.push(fromJS(payload.turn)))
      .setIn(['viewerGrid', payload.turn.index], Number(payload.turn.hit))
  case RECEIVE_HIT:
    if (payload.id !== state.get('id')) return state

    return state
      .set('isViewerTurn', false)
      .updateIn(['turns'], update => update.push(fromJS(payload.turn)))
      .setIn(['viewerGrid', payload.turn.index], Number(payload.turn.hit))
      .set('versusScore', payload.versusScore)
      .set('gameState', 21 === payload.versusScore ? 'defeated' : state.get('gameState'))
  case SAVE_TURN_SUCCESS:
    return state
      .set('isViewerTurn', payload.isViewerTurn)
      .updateIn(['turns'], update => update.push(fromJS(payload.turn)))
      .setIn(['versusGrid', payload.turn.index], Number(payload.turn.hit))
      .set('viewerScore', payload.viewerScore)
      .set('gameState', 21 === payload.viewerScore ? 'victory' : state.get('gameState'))
  case SAVE_TURN_FAILURE:
      // @TODO here be a side-effect
    if ('failed' === state.get('gameState')) location.reload()
    return state
        .set('gameState', 'failed')
        .set('reasonFailed', payload.error.message)
  case SAVE_TURN_REQUESTED:
    return state.set('selectedCell', -1)
  default:
    return state
  }
}
