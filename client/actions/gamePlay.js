import { CALL_SOCKET } from '../middleware/socket'
import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  RESUME_GAME_REQUEST,
  RESUME_GAME_SUCCESS,
  RESUME_GAME_FAILURE,
} from '../constants/ActionTypes'

export function newGame(data) {
  return {
    [CALL_SOCKET]: {
      types: [ NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE ],
      data,
    },
  }
}

export function resumeGame(id) {
  return {
    [CALL_SOCKET]: {
      types: [ RESUME_GAME_REQUEST, RESUME_GAME_SUCCESS, RESUME_GAME_FAILURE ],
      id,
    },
  }
}