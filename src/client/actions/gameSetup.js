import {
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  JOIN_GAME_REQUESTED,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILURE,
  ADD_ITEM,
  ROTATE_ITEM,
  MOVE_ITEM,
} from '../constants/ActionTypes'
import { socketRequest } from 'redux-saga-sc'

export const newGame = data => socketRequest({
  type: NEW_GAME_REQUESTED,
  payload: {
    successType: NEW_GAME_SUCCESS,
    failureType: NEW_GAME_FAILURE,
    data,
  }
})

export const joinGame = data => socketRequest({
  type: JOIN_GAME_REQUESTED,
  payload: {
    successType: JOIN_GAME_SUCCESS,
    failureType: JOIN_GAME_FAILURE,
    data,
  }
})

// @TODO maybe move this to a shared utility
const indexToCoordinates = index => {
  const y = Math.floor(index / 10)
  const x = index - (y * 10)
  return [x, y]
}

export const addItem = (item, startIndex, y) => ({
  type: ADD_ITEM,
  position: y && [startIndex, y] || indexToCoordinates(startIndex),
  item,
})
export const moveItem = (item, startIndex, y) => ({
  type: MOVE_ITEM,
  position: y && [startIndex, y] || indexToCoordinates(startIndex),
  item,
})

export const rotateItem = item => ({
  type: ROTATE_ITEM,
  item,
})
