import {
  ADD_ITEM,
  ROTATE_ITEM,
  MOVE_ITEM,
  REMOVE_ITEM,
  RESET_ITEMS,
  LOAD_ITEMS,
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

const createStartIndex = ([x, y]) => (y * 10) + x

const createCoordinates = (rotated, startIndex, itemType, [, ...itemState]) => {
  const coordinates = itemState.map((gridPoint, insertIndex) => {
    return startIndex + (rotated ? (insertIndex * 10) : insertIndex)
  })
  
  
  var firstCoordinate = coordinates[0]
  var lastCoordinate = coordinates[coordinates.length - 1]
  // check for x-axis overflow
  if(!rotated && Math.floor(firstCoordinate / 10) !== Math.floor(lastCoordinate / 10)) {
    return false
  }
  
  // check for grid y-axis overflow
  if(lastCoordinate > 99) {
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
  items: {
    xl:  [0, -1, -1, -1, -1, -1],
    l:   [0, -1, -1, -1, -1],
    m1:  [0, -1, -1, -1],
    m2:  [0, -1, -1, -1],
    s1:  [0, -1, -1],
    s2:  [0, -1, -1],
    xs1: [0, -1],
    xs2: [0, -1]
  }
})
export const board = (state = initialState, action) => {
  switch (action.type) {
  case ADD_ITEM:
    // basic validation
    if(validateStartPosition(action.position)) {
      return state
    }

    var itemType = getItemType(action.item)
    var item = state.getIn(['items', action.item])
    var startIndex = (action.position[1] * 10) + action.position[0]
    
    if(state.get('grid').contains(itemType.id)) {
      return state
    }
    
    var startIndex = createStartIndex(action.position)
    var coordinates = createCoordinates(action.rotated, startIndex, itemType, item)
    if(!coordinates) {
      return state
    }
    
    var isPositionsTaken = coordinates.reduce(
      (positionsCheck, currentPosition, index) => {
        return positionsCheck + state.getIn(['grid', currentPosition])
      },
      0
    )
    if(isPositionsTaken > 0) {
      return state
    }
    
    return coordinates.reduce(
      (previousState, currentPosition, index) => {
        return previousState
          .setIn(['items', action.item, index + 1], currentPosition)
          .setIn(['grid', currentPosition], itemType.id)
      },
      state.setIn(['items', action.item, 0], action.rotated ? 1 : 0)
    )
  case ROTATE_ITEM:
    var itemType = getItemType(action.item)
    var item = state.getIn(['items', action.item])
    var startIndex = item.get(1)
    var coordinates = createCoordinates(action.rotated, startIndex, itemType, item)
    if(!coordinates) {
      return state
    }
  
    var isPositionsTaken = coordinates.reduce(
      (positionsCheck, currentPosition, index) => {
        const existingPosition = state.getIn(['grid', currentPosition])
        if(existingPosition === itemType.id) {
          return positionsCheck
        }
        return positionsCheck + existingPosition
      },
      0
    )
    if(isPositionsTaken > 0) {
      return state
    }
    
    state = item.unshift().reduce(
      (previousState, previousPosition) => {
        return previousState.setIn(['grid', previousPosition], 0)
      },
      state
    )
  
    return coordinates.reduce(
      (previousState, currentPosition, index) => {
        return previousState
          .setIn(['items', action.item, index + 1], currentPosition)
          .setIn(['grid', currentPosition], itemType.id)
      },
      state.setIn(['items', action.item, 0], action.rotated ? 1 : 0)
    )
  case MOVE_ITEM:
    var itemType = getItemType(action.item)
    var item = state.getIn(['items', action.item])
    var rotated = item.get(0)
    var startIndex = createStartIndex(action.position)
    var coordinates = createCoordinates(rotated, startIndex, itemType, item)
    if(!coordinates) {
      return state
    }
  
    var isPositionsTaken = coordinates.reduce(
      (positionsCheck, currentPosition, index) => {
        const existingPosition = state.getIn(['grid', currentPosition])
        if(existingPosition === itemType.id) {
          return positionsCheck
        }
        return positionsCheck + existingPosition
      },
      0
    )
    if(isPositionsTaken > 0) {
      return state
    }
    
    state = item.shift().reduce(
      (previousState, previousPosition) => {
        return previousState.setIn(['grid', previousPosition], 0)
      },
      state
    )
  
    return coordinates.reduce(
      (previousState, currentPosition, index) => {
        return previousState
          .setIn(['items', action.item, index + 1], currentPosition)
          .setIn(['grid', currentPosition], itemType.id)
      },
      state.setIn(['items', action.item, 0], action.rotated ? 1 : 0)
    )
  case REMOVE_ITEM:
    var itemType = getItemType(action.item)
    var item = state.getIn(['items', action.item])

    return item.shift().reduce(
      (previousState, previousPosition, index) => {
        return previousState
          .setIn(['items', action.item, index + 1], -1)
          .setIn(['grid', previousPosition], 0)
      },
      state
    )
  case RESET_ITEMS:
    return initialState
  case LOAD_ITEMS:
    return state.merge(action.board)
  default:
    return state
  }
}