import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  JOIN_GAME_REQUEST,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILURE,
  ADD_ITEM,
  ROTATE_ITEM,
  MOVE_ITEM,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export const validateSetup = data => ({
  [CALL_SOCKET]: {
    types: [NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE],
    data,
  }
})

export const newGame = data => ({
  [CALL_SOCKET]: {
    types: [NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE],
    data,
  }
})

export const joinGame = data => ({
  [CALL_SOCKET]: {
    types: [JOIN_GAME_REQUEST, JOIN_GAME_SUCCESS, JOIN_GAME_FAILURE],
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
