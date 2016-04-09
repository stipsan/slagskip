'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var _immutable = require('immutable');

var _board = require('./board');

const initialState = (0, _immutable.fromJS)({
  id: null,
  versus: null,
  versusGrid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  viewerGrid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  viewerBoard: (0, _board.board)(undefined, {}),
  turns: [],
  isViewerFirst: null,
  isViewerTurn: false,
  gameState: 'standby', // loading | failed | setup | waiting | ready | victory | defeat
  reasonFailed: null,
  selectedCell: -1,
  viewerScore: 0,
  versusScore: 0
});

const game = exports.game = function () {
  let state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  let action = arguments[1];

  switch (action.type) {
    case _ActionTypes.NEW_GAME_REQUEST:
      return initialState.set('gameState', 'setup');
    case _ActionTypes.NEW_GAME_SUCCESS:
      return state.set('id', action.id).set('gameState', 'waiting');
    case _ActionTypes.JOIN_GAME_SUCCESS:
      return initialState.set('id', action.id).set('gameState', 'ready');
    case _ActionTypes.LOAD_GAME_REQUEST:
      return initialState.set('id', action.id).set('gameState', 'loading');
    case _ActionTypes.LOAD_GAME_FAILURE:
      return state.set('gameState', 'failed').set('reasonFailed', action.error.message);
    case _ActionTypes.LOAD_GAME_SUCCESS:
      return state.merge({
        id: action.id,
        versus: action.versus,
        viewerBoard: (0, _board.board)(undefined, {
          type: _ActionTypes.LOAD_ITEMS,
          board: {
            grid: action.viewerBoard
          }
        }),
        turns: action.turns || [],
        gameState: action.gameState,
        isViewerFirst: action.isViewerFirst,
        isViewerTurn: action.isViewerFirst,
        viewerScore: action.viewerScore,
        versusScore: action.versusScore
      }).update(state => {
        return state.get('turns').reduce((previousState, turn) => {
          // Versus opponent moves
          if (turn.get('id') === state.get('versus')) {
            if (turn.get('hit') === true) {
              return previousState.set('isViewerTurn', false).setIn(['viewerGrid', turn.get('index')], Number(turn.get('hit')));
            } else {
              return previousState.set('isViewerTurn', true).setIn(['viewerGrid', turn.get('index')], Number(turn.get('hit')));
            }
            // Viewer moves
          } else {
              if (turn.get('hit') === true) {
                return previousState.set('isViewerTurn', true).setIn(['versusGrid', turn.get('index')], Number(turn.get('hit')));
              } else {
                return previousState.set('isViewerTurn', false).setIn(['versusGrid', turn.get('index')], Number(turn.get('hit')));
              }
            }
        }, state);
      });
    case _ActionTypes.PLACE_CROSSHAIRS:
      return state.set('selectedCell', action.selectedCell);
    case _ActionTypes.RECEIVE_MISS:
      if (action.id !== state.get('id')) return state;

      return state.set('isViewerTurn', true).updateIn(['turns'], update => update.push((0, _immutable.fromJS)(action.turn))).setIn(['viewerGrid', action.turn.index], Number(action.turn.hit));
    case _ActionTypes.RECEIVE_HIT:
      if (action.id !== state.get('id')) return state;

      return state.set('isViewerTurn', false).updateIn(['turns'], update => update.push((0, _immutable.fromJS)(action.turn))).setIn(['viewerGrid', action.turn.index], Number(action.turn.hit)).set('versusScore', action.versusScore).set('gameState', action.versusScore === 21 ? 'defeated' : state.get('gameState'));
    case _ActionTypes.FIRE_CANNON_SUCCESS:
      return state.set('isViewerTurn', action.isViewerTurn).updateIn(['turns'], update => update.push((0, _immutable.fromJS)(action.turn))).setIn(['versusGrid', action.turn.index], Number(action.turn.hit)).set('viewerScore', action.viewerScore).set('gameState', action.viewerScore === 21 ? 'victory' : state.get('gameState'));
    case _ActionTypes.FIRE_CANNON_FAILURE:
      // @TODO here be a side-effect
      if (state.get('gameState') === 'failed') location.reload();
      return state.set('gameState', 'failed').set('reasonFailed', action.error.message);
    case _ActionTypes.FIRE_CANNON_REQUEST:
      return state.set('selectedCell', -1);
    default:
      return state;
  }
};