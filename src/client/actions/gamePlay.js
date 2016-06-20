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
import { socketRequest } from 'redux-saga-sc'

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
  selectedCell,
})

export const fireCannon = data => socketRequest({
  type: FIRE_CANNON_REQUESTED,
  payload: {
    successType: FIRE_CANNON_SUCCESS,
    failureType: FIRE_CANNON_FAILURE,
    data,
  }
})
