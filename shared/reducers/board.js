import {
  ADD_ITEM,
} from '../constants/ActionTypes'
import { fromJS } from 'immutable'

const itemTypes = {
  xl: {id: 1, size: 5},
  l: {id: 2, size: 4},
  m1: {id: 3, size: 3},
  m2: {id: 4, size: 3},
  s1: {id: 5, size: 2},
  s2: {id: 6, size: 2},
  xs1: {id: 7, size: 1},
  xs2: {id: 8, size: 1}
}
const getItemType = type => {
  return itemTypes[type]
}

const validateStartPosition = ([x, y]) => {
  return x < 0 || y < 0 || x > 9 || y > 9
}

const createCoordinates = (rotated, [x, y], itemType, [, ...itemState]) => {
  const startIndex = (y * 10) + x
  const coordinates = itemState.map((gridPoint, insertIndex) => {
    return startIndex + (rotated ? (insertIndex * 10) : insertIndex)
  })
  
  // check for grid overflow
  if(coordinates[coordinates.length - 1] > 99) {
    return false
  }
  
  return coordinates
}

const initialState = fromJS({
  grid: [
//      a  b  c  d  e  f  g  h  i  j  
/* 0 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 1 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 2 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 3 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 4 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 5 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 6 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 7 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 8 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
/* 9 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  xl:  [0, -1, -1, -1, -1, -1],
  l:   [0, -1, -1, -1, -1],
  m1:  [0, -1, -1, -1],
  m2:  [0, -1, -1, -1],
  s1:  [0, -1, -1],
  s2:  [0, -1, -1],
  xs1: [0, -1],
  xs2: [0, -1]
})
export const board = (state = initialState, action) => {
  switch (action.type) {
  case ADD_ITEM:
    // basic validation
    if(validateStartPosition(action.position)) {
      return state
    }

    const itemType = getItemType(action.item)
    const item = state.get(action.item)
    const startIndex = (action.position[1] * 10) + action.position[0]
    
    if(state.get('grid').contains(itemType.id)) {
      return state
    }
    
    const coordinates = createCoordinates(action.rotated, action.position, itemType, item)
    if(!coordinates) {
      return state
    }
    
    return coordinates.reduce(
      (previousState, currentPosition, index) => {
        return previousState
          .setIn([action.item, index + 1], currentPosition)
          .setIn(['grid', currentPosition], itemType.id)
      },
      state.setIn([action.item, 0], action.rotated ? 1 : 0)
    )
  
  default:
    return state
  }
}