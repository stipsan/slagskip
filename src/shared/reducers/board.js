import { fromJS } from 'immutable'

import {
  ADD_ITEM,
  ROTATE_ITEM,
  MOVE_ITEM,
  REMOVE_ITEM,
  RESET_ITEMS,
  LOAD_GAME_SUCCESS,
  LOAD_ITEMS,
  RANDOM_ITEMS,
} from '../constants/ActionTypes'

const itemTypes = {
  xl: { id: 1, size: 5 },
  l: { id: 2, size: 4 },
  m1: { id: 3, size: 3 },
  m2: { id: 4, size: 3 },
  s1: { id: 5, size: 2 },
  s2: { id: 6, size: 2 },
  xs1: { id: 7, size: 1 },
  xs2: { id: 8, size: 1 }
}
const getItemType = type => itemTypes[type]

const validateStartPosition = ([x, y]) => 0 > x || 0 > y || 9 < x || 9 < y

const createStartIndex = ([x, y]) => (y * 10) + x

const createCoordinates = (rotated, startIndex, itemType, [, ...itemState]) => {
  const coordinates = itemState.map((gridPoint, insertIndex) =>
    startIndex + (rotated ? (insertIndex * 10) : insertIndex)
  )


  const firstCoordinate = coordinates[0]
  const lastCoordinate = coordinates[coordinates.length - 1]
  // check for x-axis overflow
  if (!rotated && Math.floor(firstCoordinate / 10) !== Math.floor(lastCoordinate / 10)) {
    return false
  }

  // check for grid y-axis overflow
  if (99 < lastCoordinate) {
    return false
  }

  return coordinates
}

const getRandomRotated = () => Math.floor(Math.random() * 1)

const addItem = (state, action) => {
  // basic validation
  if (validateStartPosition(action.position)) {
    return state
  }

  const itemType = getItemType(action.item)
  const item = state.getIn(['items', action.item])

  if (state.get('grid').contains(itemType.id)) {
    return state
  }

  const startIndex = createStartIndex(action.position)
  const coordinates = createCoordinates(action.rotated, startIndex, itemType, item)
  if (!coordinates) {
    return state
  }

  const isPositionsTaken = coordinates.reduce(
    (positionsCheck, currentPosition) =>
      positionsCheck + state.getIn(['grid', currentPosition]), 0
  )
  if (0 < isPositionsTaken) {
    return state
  }

  return coordinates.reduce(
    (previousState, currentPosition, index) =>
      previousState
        .setIn(['items', action.item, index + 1], currentPosition)
        .setIn(['grid', currentPosition], itemType.id),
    state.setIn(['items', action.item, 0], action.rotated ? 1 : 0)
  )
}

const rotateItem = (state, action) => {
  const itemType = getItemType(action.item)
  const item = state.getIn(['items', action.item])
  const startIndex = item.get(1)
  const rotated = action.rotated || !item.get(0)

  const coordinates = createCoordinates(rotated, startIndex, itemType, item)
  if (!coordinates || -1 === startIndex) {
    return state
  }

  const isPositionsTaken = coordinates.reduce(
    (positionsCheck, currentPosition) => {
      const existingPosition = state.getIn(['grid', currentPosition])
      if (existingPosition === itemType.id) {
        return positionsCheck
      }
      return positionsCheck + existingPosition
    },
    0
  )
  if (0 < isPositionsTaken) {
    return state
  }

  const newState = item.shift().reduce(
    (previousState, previousPosition) => previousState.setIn(['grid', previousPosition], 0), state
  )

  return coordinates.reduce(
    (previousState, currentPosition, index) =>
      previousState
        .setIn(['items', action.item, index + 1], currentPosition)
        .setIn(['grid', currentPosition], itemType.id),
    newState.setIn(['items', action.item, 0], rotated ? 1 : 0)
  )
}

const moveItem = (state, action) => {
  const itemType = getItemType(action.item)
  const item = state.getIn(['items', action.item])
  const rotated = item.get(0)
  const startIndex = createStartIndex(action.position)
  const coordinates = createCoordinates(rotated, startIndex, itemType, item)
  if (!coordinates) {
    return state
  }

  const isPositionsTaken = coordinates.reduce(
    (positionsCheck, currentPosition) => {
      const existingPosition = state.getIn(['grid', currentPosition])
      if (existingPosition === itemType.id) {
        return positionsCheck
      }
      return positionsCheck + existingPosition
    },
    0
  )
  if (0 < isPositionsTaken) {
    return state
  }

  const newState = item.shift().reduce(
    (previousState, previousPosition) => previousState.setIn(['grid', previousPosition], 0), state
  )

  return coordinates.reduce(
    (previousState, currentPosition, index) =>
      previousState
        .setIn(['items', action.item, index + 1], currentPosition)
        .setIn(['grid', currentPosition], itemType.id),
    newState.setIn(['items', action.item, 0], rotated)
  )
}

const removeItem = (state, action) => {
  const item = state.getIn(['items', action.item])

  return item.shift().reduce(
    (previousState, previousPosition, index) =>
      previousState
        .setIn(['items', action.item, index + 1], -1)
        .setIn(['grid', previousPosition], 0),
    state
  )
}

const randomItems = (state, action) => {
  const getRotated = action.getRotated || getRandomRotated
  let newRandomState = state
  const keys = [...state.get('items').keys()]
  let m = true

  // @TODO randomize MOVE_ITEM and ROTATE_ITEM as well
  // @TODO see if assigning to newRandomState in a loop is better done with withMutable instead

  while (m) {
    const randomKey = keys[Math.floor(Math.random() * keys.length)]

    const randomX = Math.floor(Math.random() * 9)
    const randomY = Math.floor(Math.random() * 9)
    const randomRotated = getRotated()

    newRandomState = addItem(newRandomState, {
      item: randomKey,
      position: [randomX, randomY],
      rotated: randomRotated
    })

    m = -1 === newRandomState.getIn(['items', 'xl', 1]) ||
        -1 === newRandomState.getIn(['items', 'l', 1]) ||
        -1 === newRandomState.getIn(['items', 'm1', 1]) ||
        -1 === newRandomState.getIn(['items', 'm2', 1]) ||
        -1 === newRandomState.getIn(['items', 's1', 1]) ||
        -1 === newRandomState.getIn(['items', 's2', 1]) ||
        -1 === newRandomState.getIn(['items', 'xs1', 1]) ||
        -1 === newRandomState.getIn(['items', 'xs2', 1])
  }

  return newRandomState
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
    xl: [0, -1, -1, -1, -1, -1],
    l: [0, -1, -1, -1, -1],
    m1: [0, -1, -1, -1],
    m2: [0, -1, -1, -1],
    s1: [0, -1, -1],
    s2: [0, -1, -1],
    xs1: [0, -1],
    xs2: [0, -1]
  }
})

export const board = (state = initialState, action) => {
  switch (action.type) {
  case ADD_ITEM:
    return addItem(state, action)
  case ROTATE_ITEM:
    return rotateItem(state, action)
  case MOVE_ITEM:
    return moveItem(state, action)
  case REMOVE_ITEM:
    return removeItem(state, action)
  case LOAD_GAME_SUCCESS:
  case RESET_ITEMS:
    return initialState
  case LOAD_ITEMS:
    return state.merge(action.board)
  case RANDOM_ITEMS:
    return randomItems(state, action)
  default:
    return state
  }
}
