import {
  RESUME_GAME_REQUESTED,
  RESUME_GAME_SUCCESS,
  RESUME_GAME_FAILURE,
  LOAD_GAME_REQUESTED,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  PLACE_CROSSHAIRS,
  FIRE_CANNON_REQUESTED,
  FIRE_CANNON_SUCCESS,
  FIRE_CANNON_FAILURE,
} from '../constants/ActionTypes'

// @FIXME refactor
const CALL_SOCKET = 'todo'

export const resumeGame = id => ({
  [CALL_SOCKET]: {
    types: [RESUME_GAME_REQUESTED, RESUME_GAME_SUCCESS, RESUME_GAME_FAILURE],
    id,
  }
})

export const loadGame = id => ({
  [CALL_SOCKET]: {
    types: [LOAD_GAME_REQUESTED, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE],
    data: { id },
  }
})

export const selectCell = selectedCell => ({
  type: PLACE_CROSSHAIRS,
  selectedCell,
})

export const fireCannon = data => ({
  [CALL_SOCKET]: {
    types: [FIRE_CANNON_REQUESTED, FIRE_CANNON_SUCCESS, FIRE_CANNON_FAILURE],
    data,
  }
})
