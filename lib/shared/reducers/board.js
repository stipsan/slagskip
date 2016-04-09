'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.board = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ActionTypes = require('../constants/ActionTypes');

var _immutable = require('immutable');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

const itemTypes = {
  xl: { id: 1, size: 5 },
  l: { id: 2, size: 4 },
  m1: { id: 3, size: 3 },
  m2: { id: 4, size: 3 },
  s1: { id: 5, size: 2 },
  s2: { id: 6, size: 2 },
  xs1: { id: 7, size: 1 },
  xs2: { id: 8, size: 1 }
};
const getItemType = type => {
  return itemTypes[type];
};

const validateStartPosition = _ref => {
  var _ref2 = _slicedToArray(_ref, 2);

  let x = _ref2[0];
  let y = _ref2[1];

  return x < 0 || y < 0 || x > 9 || y > 9;
};

const createStartIndex = _ref3 => {
  var _ref4 = _slicedToArray(_ref3, 2);

  let x = _ref4[0];
  let y = _ref4[1];
  return y * 10 + x;
};

const createCoordinates = (rotated, startIndex, itemType, _ref5) => {
  var _ref6 = _toArray(_ref5);

  let itemState = _ref6.slice(1);

  const coordinates = itemState.map((gridPoint, insertIndex) => {
    return startIndex + (rotated ? insertIndex * 10 : insertIndex);
  });

  var firstCoordinate = coordinates[0];
  var lastCoordinate = coordinates[coordinates.length - 1];
  // check for x-axis overflow
  if (!rotated && Math.floor(firstCoordinate / 10) !== Math.floor(lastCoordinate / 10)) {
    return false;
  }

  // check for grid y-axis overflow
  if (lastCoordinate > 99) {
    return false;
  }

  return coordinates;
};

const getRandomRotated = () => {
  return Math.floor(Math.random() * 1);
};

const addItem = (state, action) => {
  // basic validation
  if (validateStartPosition(action.position)) {
    return state;
  }

  var itemType = getItemType(action.item);
  var item = state.getIn(['items', action.item]);
  var startIndex = action.position[1] * 10 + action.position[0];

  if (state.get('grid').contains(itemType.id)) {
    return state;
  }

  var startIndex = createStartIndex(action.position);
  var coordinates = createCoordinates(action.rotated, startIndex, itemType, item);
  if (!coordinates) {
    return state;
  }

  var isPositionsTaken = coordinates.reduce((positionsCheck, currentPosition, index) => {
    return positionsCheck + state.getIn(['grid', currentPosition]);
  }, 0);
  if (isPositionsTaken > 0) {
    return state;
  }

  return coordinates.reduce((previousState, currentPosition, index) => {
    return previousState.setIn(['items', action.item, index + 1], currentPosition).setIn(['grid', currentPosition], itemType.id);
  }, state.setIn(['items', action.item, 0], action.rotated ? 1 : 0));
};

const initialState = (0, _immutable.fromJS)({
  grid: [
  //      a  b  c  d  e  f  g  h  i  j 
  /* 0 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 1 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 2 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 3 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 4 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 5 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 6 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 7 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 8 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 9 */0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
});
const board = exports.board = function () {
  let state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  let action = arguments[1];

  switch (action.type) {
    case _ActionTypes.ADD_ITEM:
      return addItem(state, action);
    case _ActionTypes.ROTATE_ITEM:
      var itemType = getItemType(action.item);
      var item = state.getIn(['items', action.item]);
      var startIndex = item.get(1);
      var rotated = action.rotated || !item.get(0);

      var coordinates = createCoordinates(rotated, startIndex, itemType, item);
      if (!coordinates || startIndex === -1) {
        return state;
      }

      var isPositionsTaken = coordinates.reduce((positionsCheck, currentPosition, index) => {
        const existingPosition = state.getIn(['grid', currentPosition]);
        if (existingPosition === itemType.id) {
          return positionsCheck;
        }
        return positionsCheck + existingPosition;
      }, 0);
      if (isPositionsTaken > 0) {
        return state;
      }

      state = item.shift().reduce((previousState, previousPosition) => {
        return previousState.setIn(['grid', previousPosition], 0);
      }, state);

      return coordinates.reduce((previousState, currentPosition, index) => {
        return previousState.setIn(['items', action.item, index + 1], currentPosition).setIn(['grid', currentPosition], itemType.id);
      }, state.setIn(['items', action.item, 0], rotated ? 1 : 0));
    case _ActionTypes.MOVE_ITEM:
      var itemType = getItemType(action.item);
      var item = state.getIn(['items', action.item]);
      var rotated = item.get(0);
      var startIndex = createStartIndex(action.position);
      var coordinates = createCoordinates(rotated, startIndex, itemType, item);
      if (!coordinates) {
        return state;
      }

      var isPositionsTaken = coordinates.reduce((positionsCheck, currentPosition, index) => {
        const existingPosition = state.getIn(['grid', currentPosition]);
        if (existingPosition === itemType.id) {
          return positionsCheck;
        }
        return positionsCheck + existingPosition;
      }, 0);
      if (isPositionsTaken > 0) {
        return state;
      }

      state = item.shift().reduce((previousState, previousPosition) => {
        return previousState.setIn(['grid', previousPosition], 0);
      }, state);

      return coordinates.reduce((previousState, currentPosition, index) => {
        return previousState.setIn(['items', action.item, index + 1], currentPosition).setIn(['grid', currentPosition], itemType.id);
      }, state.setIn(['items', action.item, 0], rotated));
    case _ActionTypes.REMOVE_ITEM:
      var itemType = getItemType(action.item);
      var item = state.getIn(['items', action.item]);

      return item.shift().reduce((previousState, previousPosition, index) => {
        return previousState.setIn(['items', action.item, index + 1], -1).setIn(['grid', previousPosition], 0);
      }, state);
    case _ActionTypes.LOAD_GAME_SUCCESS:
    case _ActionTypes.RESET_ITEMS:
      return initialState;
    case _ActionTypes.LOAD_ITEMS:
      return state.merge(action.board);
    case _ActionTypes.RANDOM_ITEMS:

      const getRotated = action.getRotated || getRandomRotated;
      let newRandomState = state;
      let keys = [].concat(_toConsumableArray(state.get('items').keys()));
      let m = true;
      let safeguard = 0;

      // @TODO randomize MOVE_ITEM and ROTATE_ITEM as well
      // @TODO see if assigning to newRandomState in a loop is better done with withMutable instead

      while (m) {
        let randomKey = keys[Math.floor(Math.random() * keys.length)];

        let randomX = Math.floor(Math.random() * 9);
        let randomY = Math.floor(Math.random() * 9);
        let randomRotated = getRotated();

        newRandomState = addItem(newRandomState, {
          item: randomKey,
          position: [randomX, randomY],
          rotated: randomRotated
        });

        m = newRandomState.getIn(['items', 'xl', 1]) === -1 || newRandomState.getIn(['items', 'l', 1]) === -1 || newRandomState.getIn(['items', 'm1', 1]) === -1 || newRandomState.getIn(['items', 'm2', 1]) === -1 || newRandomState.getIn(['items', 's1', 1]) === -1 || newRandomState.getIn(['items', 's2', 1]) === -1 || newRandomState.getIn(['items', 'xs1', 1]) === -1 || newRandomState.getIn(['items', 'xs2', 1]) === -1;
      }

      return newRandomState;
    default:
      return state;
  }
};