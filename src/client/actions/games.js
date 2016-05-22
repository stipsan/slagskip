import {
  GAMES_REQUESTED,
  GAMES_SUCCESS,
  GAMES_FAILURE,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const fetchGames = () => ({
  [CALL_SOCKET]: {
    types: [GAMES_REQUESTED, GAMES_SUCCESS, GAMES_FAILURE]
  }
})
