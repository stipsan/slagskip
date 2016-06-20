import {
  GAMES_REQUESTED,
  GAMES_SUCCESS,
  GAMES_FAILURE,
} from '../constants/ActionTypes'
import { socketRequest } from 'redux-saga-sc'

export const fetchGames = gameIds => socketRequest({
  type: GAMES_REQUESTED,
  payload: {
    successType: GAMES_SUCCESS,
    failureType: GAMES_FAILURE,
    gameIds,
  }
})
