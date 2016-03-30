import { CALL_SOCKET } from '../middleware/socket'
import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
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

export function resumeGame(id) {
  return {
    [CALL_SOCKET]: {
      types: [ RESUME_GAME_REQUEST, RESUME_GAME_SUCCESS, RESUME_GAME_FAILURE ],
      id,
    },
  }
}

export function loadGame(id) {
  return {
    [CALL_SOCKET]: {
      types: [ LOAD_GAME_REQUEST, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE ],
      data: { id },
    },
  }
}

export const selectCell = selectedCell => {
  return {
    type: PLACE_CROSSHAIRS,
    selectedCell
  }
}

export const fireCannon = selectedCell => {
  return {
    [CALL_SOCKET]: {
      types: [ FIRE_CANNON_REQUEST, FIRE_CANNON_SUCCESS, FIRE_CANNON_FAILURE ],
      data: { selectedCell },
    },
  }
}