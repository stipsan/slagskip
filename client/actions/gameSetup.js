import { CALL_SOCKET } from '../middleware/socket'
import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  JOIN_GAME_REQUEST,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILURE,
  ADD_ITEM,
} from '../constants/ActionTypes'

export function validateSetup(data) {
  return {
    [CALL_SOCKET]: {
      types: [ NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE ],
      data,
    },
  }
}

export const newGame = data => {
  return {
    [CALL_SOCKET]: {
      types: [ NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE ],
      data,
    },
  }
}

export const joinGame = data => {
  return {
    [CALL_SOCKET]: {
      types: [ JOIN_GAME_REQUEST, JOIN_GAME_SUCCESS, JOIN_GAME_FAILURE ],
      data,
    },
  }
}

export const addItem = (item, startIndex) => {
  const y = Math.floor( startIndex / 10 )
  const x = startIndex - ( y * 10 )
  const position = [x, y]
  return {
    type: ADD_ITEM,
    item,
    position
  }
}