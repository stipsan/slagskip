'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _ActionTypes = require('../../constants/ActionTypes');

var _actions = require('../../actions');

// @TODO perhaps this belongs in a custom middleware
const actions = exports.actions = {
  [_ActionTypes.AUTHENTICATE_REQUEST]: _actions.authenticateRequest,
  [_ActionTypes.DEAUTHENTICATE_REQUEST]: _actions.deauthenticateRequest,
  [_ActionTypes.FRIENDS_REQUEST]: _actions.friendsRequest,
  [_ActionTypes.GAME_INVITE_REQUEST]: _actions.gameInvite,
  [_ActionTypes.ACCEPT_GAME_INVITE_REQUEST]: _actions.acceptGameInvite,
  [_ActionTypes.DECLINE_GAME_INVITE_REQUEST]: _actions.declineGameInvite,
  [_ActionTypes.CANCEL_GAME_INVITE_REQUEST]: _actions.cancelGameInvite,
  [_ActionTypes.RECEIVE_FRIEND_NETWORK_STATUS]: _actions.broadcastNetworkStatus,
  [_ActionTypes.LOAD_GAME_REQUEST]: _actions.loadGame,
  [_ActionTypes.FIRE_CANNON_REQUEST]: _actions.fireCannon,
  [_ActionTypes.NEW_GAME_REQUEST]: _actions.newGame,
  [_ActionTypes.GAMES_REQUEST]: _actions.gamesRequest,
  [_ActionTypes.JOIN_GAME_REQUEST]: _actions.joinGame
};