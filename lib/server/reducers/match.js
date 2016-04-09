'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var _immutable = require('immutable');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const initialState = (0, _immutable.Map)({
  hits: []
});

const match = exports.match = function () {
  let state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  let _ref = arguments[1];
  let type = _ref.type;

  let action = _objectWithoutProperties(_ref, ['type']);

  switch (type) {
    case _ActionTypes.LOAD_GAME_SUCCESS:
      return state.merge(action);
    case _ActionTypes.FIRE_CANNON_SUCCESS:
    //return state.updateIn(['hits'], hits => hits.push(action.hit))
    default:
      return state;
  }
};