import { socketRequest } from 'redux-saga-sc'

import {
  RESUME_GAME_REQUESTED,
  RESUME_GAME_SUCCESS,
  RESUME_GAME_FAILURE,
  LOAD_GAME_REQUESTED,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  PLACE_CROSSHAIRS,
  SAVE_TURN_REQUESTED,
  SAVE_TURN_SUCCESS,
  SAVE_TURN_FAILURE,
} from '../constants/ActionTypes'

export const resumeGame = id => socketRequest({
  type: RESUME_GAME_REQUESTED,
  payload: {
    successType: RESUME_GAME_SUCCESS,
    failureType: RESUME_GAME_FAILURE,
    id,
  }
})

export const loadGame = id => socketRequest({
  type: LOAD_GAME_REQUESTED,
  payload: {
    successType: LOAD_GAME_SUCCESS,
    failureType: LOAD_GAME_FAILURE,
    id,
  }
})

export const selectCell = selectedCell => ({
  type: PLACE_CROSSHAIRS,
  payload: { selectedCell },
})

export const fireCannon = data => socketRequest({
  type: SAVE_TURN_REQUESTED,
  payload: {
    successType: SAVE_TURN_SUCCESS,
    failureType: SAVE_TURN_FAILURE,
    ...data,
  }
})
