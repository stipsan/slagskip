import { CALL_SOCKET } from '../middleware/socket'
import {
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_FAILURE,
} from '../constants/ActionTypes'

export function fetchGames() {
  return {
    [CALL_SOCKET]: {
      types: [GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE]
    },
  }
}
