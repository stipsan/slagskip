'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewer = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var _immutable = require('immutable');

const initialState = (0, _immutable.Map)({
  friendIds: [],
  invites: [],
  games: []
});

const viewer = exports.viewer = function () {
  let state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  let action = arguments[1];

  switch (action.type) {
    case _ActionTypes.RECEIVE_VIEWER:
      return state.merge({
        friendIds: action.friendIds,
        invites: action.invites,
        games: action.games
      });
    default:
      return state;
  }
};