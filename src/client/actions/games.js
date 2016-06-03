import {
  GAMES_REQUESTED,
  GAMES_SUCCESS,
  GAMES_FAILURE,
} from '../constants/ActionTypes'

export const fetchGames = gameIds => ({
  type: GAMES_REQUESTED,
  payload: {
    successType: GAMES_SUCCESS,
    failureType: GAMES_FAILURE,
    gameIds,
  }
})
