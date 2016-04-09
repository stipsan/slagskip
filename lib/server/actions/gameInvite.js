'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelGameInvite = exports.declineGameInvite = exports.acceptGameInvite = exports.gameInvite = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ActionTypes = require('../constants/ActionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gameInvite = exports.gameInvite = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.viewerSendsInvite(authToken, action.id, redis).then(_ref => {
    let id = _ref.id;
    let inviteOut = _ref.inviteOut;

    (0, _invariant2.default)(id, 'database.viewerSendsInvite failed to return id');
    (0, _invariant2.default)(inviteOut, 'database.viewerSendsInvite failed to return inviteOut');

    callback(null, { type: _ActionTypes.GAME_INVITE_SUCCESS, id, inviteOut });
    socket.exchange.publish(`user:${ id }`, {
      type: _ActionTypes.RECEIVE_GAME_INVITE,
      id: authToken.id,
      inviteIn: true
    });
  }).catch(error => {
    console.error(_ActionTypes.GAME_INVITE_FAILURE, error);
    callback(_ActionTypes.GAME_INVITE_FAILURE, error);
  });
};

const acceptGameInvite = exports.acceptGameInvite = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.viewerAcceptsInvite(authToken, action.id, redis).then(_ref2 => {
    let id = _ref2.id;
    let inviteOut = _ref2.inviteOut;

    (0, _invariant2.default)(id, 'database.viewerAcceptsInvite failed to return id');
    (0, _invariant2.default)(inviteOut, 'database.viewerAcceptsInvite failed to return inviteOut');

    callback(null, { type: _ActionTypes.ACCEPT_GAME_INVITE_SUCCESS, id, inviteOut });
    socket.exchange.publish(`user:${ id }`, {
      type: _ActionTypes.RECEIVE_GAME_INVITE_ACCEPTED,
      id: authToken.id,
      inviteIn: true
    });

    //@TODO send a RECEIVE_NEW_GAME to both viewer and friend with the game id
  }).catch(error => {
    console.error(_ActionTypes.ACCEPT_GAME_INVITE_FAILURE, error);
    callback(_ActionTypes.ACCEPT_GAME_INVITE_FAILURE, error);
  });
};

const declineGameInvite = exports.declineGameInvite = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.viewerDeclinesInvite(authToken, action.id, redis).then(_ref3 => {
    let id = _ref3.id;
    let inviteIn = _ref3.inviteIn;

    (0, _invariant2.default)(id, 'database.viewerDeclinesInvite failed to return id');
    (0, _invariant2.default)(inviteIn === false, 'database.viewerDeclinesInvite failed to return inviteIn');

    callback(null, { type: _ActionTypes.DECLINE_GAME_INVITE_SUCCESS, id, inviteIn });
    socket.exchange.publish(`user:${ id }`, {
      type: _ActionTypes.RECEIVE_GAME_INVITE_DECLINED,
      id: authToken.id,
      inviteOut: false
    });

    //@TODO send a RECEIVE_NEW_GAME to both viewer and friend with the game id
  }).catch(error => {
    console.error(_ActionTypes.DECLINE_GAME_INVITE_FAILURE, error);
    callback(_ActionTypes.DECLINE_GAME_INVITE_FAILURE, error);
  });
};

const cancelGameInvite = exports.cancelGameInvite = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.viewerCancelsInvite(authToken, action.id, redis).then(_ref4 => {
    let id = _ref4.id;
    let inviteOut = _ref4.inviteOut;

    (0, _invariant2.default)(id, 'database.viewerCancelsInvite failed to return id');
    (0, _invariant2.default)(inviteOut === false, 'database.viewerCancelsInvite failed to return inviteOut');

    callback(null, { type: _ActionTypes.CANCEL_GAME_INVITE_SUCCESS, id, inviteOut });
    socket.exchange.publish(`user:${ id }`, {
      type: _ActionTypes.RECEIVE_GAME_INVITE_CANCELLED,
      id: authToken.id,
      inviteIn: false
    });

    //@TODO send a RECEIVE_NEW_GAME to both viewer and friend with the game id
  }).catch(error => {
    console.error(_ActionTypes.CANCEL_GAME_INVITE_FAILURE, error);
    callback(_ActionTypes.CANCEL_GAME_INVITE_FAILURE, error);
  });
};