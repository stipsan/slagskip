import { CALL_SOCKET } from '../middleware/socket'
import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
} from '../constants/ActionTypes'

export function validateSetup(data) {
  return {
    [CALL_SOCKET]: {
      types: [ NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE ],
      data,
    },
  }
}