import {
  RESUME_GAME_REQUEST,
  RESUME_GAME_SUCCESS,
  RESUME_GAME_FAILURE,
  LOAD_GAME_REQUEST,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  PLACE_CROSSHAIRS,
  FIRE_CANNON_REQUEST,
  FIRE_CANNON_SUCCESS,
  FIRE_CANNON_FAILURE,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const resumeGame = id => ({
  [CALL_SOCKET]: {
    types: [RESUME_GAME_REQUEST, RESUME_GAME_SUCCESS, RESUME_GAME_FAILURE],
    id,
  }
})

export const loadGame = id => ({
  [CALL_SOCKET]: {
    types: [LOAD_GAME_REQUEST, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE],
    data: { id },
  }
})

export const selectCell = selectedCell => ({
  type: PLACE_CROSSHAIRS,
  selectedCell,
})

export const fireCannon = data => ({
  [CALL_SOCKET]: {
    types: [FIRE_CANNON_REQUEST, FIRE_CANNON_SUCCESS, FIRE_CANNON_FAILURE],
    data,
  }
})
