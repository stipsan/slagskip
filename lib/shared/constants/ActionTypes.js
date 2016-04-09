'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// async network requests is suffixed _REQUEST, _SUCCESS or _FAILURE
// actions that respond to server sent events is prefixed RECEIVE_

const CHECK_CAPABILITIES = exports.CHECK_CAPABILITIES = 'CHECK_CAPABILITIES';

// client local network status (client to router)
// @TODO add network middleware that dispatch these
const RECEIVE_NETWORK_OFFLINE = exports.RECEIVE_NETWORK_OFFLINE = 'RECEIVE_NETWORK_OFFLINE';
const RECEIVE_NETWORK_ONLINE = exports.RECEIVE_NETWORK_ONLINE = 'RECEIVE_NETWORK_ONLINE';

// attempting to connect SocketCluster to server
const SOCKET_REQUEST = exports.SOCKET_REQUEST = 'SOCKET_REQUEST';
// socket connected successfully
const SOCKET_SUCCESS = exports.SOCKET_SUCCESS = 'SOCKET_SUCCESS';
// socket got disconnected, or maybe the user got bandwidth capped, a firewall
// blocks the websocket but is letting http requests come through, etc.
const SOCKET_FAILURE = exports.SOCKET_FAILURE = 'SOCKET_FAILURE';
const SOCKET_ERROR = exports.SOCKET_ERROR = 'SOCKET_ERROR';
// allow manual trigger of reconnect w/o full page reload or waiting for timeout
const SOCKET_RECONNECT = exports.SOCKET_RECONNECT = 'SOCKET_RECONNECT';
const SOCKET_DISCONNECT = exports.SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';

// attempt login
const AUTHENTICATE_REQUEST = exports.AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
// login succeeded, payload contains friends, invities and game matches
const AUTHENTICATE_SUCCESS = exports.AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
const AUTHENTICATE_FAILURE = exports.AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';
// we got a valid authentication and don't need to login
const RECEIVE_VIEWER = exports.RECEIVE_VIEWER = 'RECEIVE_VIEWER';
const RECEIVE_AUTH_STATE_CHANGE = exports.RECEIVE_AUTH_STATE_CHANGE = 'RECEIVE_AUTH_STATE_CHANGE';
const RECEIVE_AUTHENTICATE = exports.RECEIVE_AUTHENTICATE = 'RECEIVE_AUTHENTICATE';
// attempt logout
const DEAUTHENTICATE_REQUEST = exports.DEAUTHENTICATE_REQUEST = 'DEAUTHENTICATE_REQUEST';
const DEAUTHENTICATE_SUCCESS = exports.DEAUTHENTICATE_SUCCESS = 'DEAUTHENTICATE_SUCCESS';
const DEAUTHENTICATE_FAILURE = exports.DEAUTHENTICATE_FAILURE = 'DEAUTHENTICATE_FAILURE';
const RECEIVE_DEAUTHENTICATE = exports.RECEIVE_DEAUTHENTICATE = 'RECEIVE_DEAUTHENTICATE';

// setup private and public service channel subs
const SUBSCRIBE_CHANNEL_REQUEST = exports.SUBSCRIBE_CHANNEL_REQUEST = 'SUBSCRIBE_CHANNEL_REQUEST';
const SUBSCRIBE_CHANNEL_SUCCESS = exports.SUBSCRIBE_CHANNEL_SUCCESS = 'SUBSCRIBE_CHANNEL_SUCCESS';
const SUBSCRIBE_CHANNEL_FAILURE = exports.SUBSCRIBE_CHANNEL_FAILURE = 'SUBSCRIBE_CHANNEL_FAILURE';
const RECEIVE_SUBSCRIBE_STATE_CHANGE = exports.RECEIVE_SUBSCRIBE_STATE_CHANGE = 'RECEIVE_SUBSCRIBE_STATE_CHANGE';
const RECEIVE_UNSUBSCRIBE_CHANNEL = exports.RECEIVE_UNSUBSCRIBE_CHANNEL = 'RECEIVE_UNSUBSCRIBE_CHANNEL';
const RECEIVE_KICK_OUT = exports.RECEIVE_KICK_OUT = 'RECEIVE_KICK_OUT';

// during alpha everybody is friends, friends lists will come later
const FRIENDS_REQUEST = exports.FRIENDS_REQUEST = 'FRIENDS_REQUEST';
const FRIENDS_SUCCESS = exports.FRIENDS_SUCCESS = 'FRIENDS_SUCCESS';
const FRIENDS_FAILURE = exports.FRIENDS_FAILURE = 'FRIENDS_FAILURE';
const RECEIVE_FRIEND = exports.RECEIVE_FRIEND = 'RECEIVE_FRIEND';
// user came online or disconnected/signed out
const RECEIVE_FRIEND_NETWORK_STATUS = exports.RECEIVE_FRIEND_NETWORK_STATUS = 'RECEIVE_FRIEND_NETWORK_STATUS';
// friend got kicked or deleted their own account
const RECEIVE_FRIEND_DELETED = exports.RECEIVE_FRIEND_DELETED = 'RECEIVE_FRIEND_DELETED';

const GAMES_REQUEST = exports.GAMES_REQUEST = 'GAMES_REQUEST';
const GAMES_SUCCESS = exports.GAMES_SUCCESS = 'GAMES_SUCCESS';
const GAMES_FAILURE = exports.GAMES_FAILURE = 'GAMES_FAILURE';

// send the invite to a friend, show spinner
const GAME_INVITE_REQUEST = exports.GAME_INVITE_REQUEST = 'GAME_INVITE_REQUEST';
// friend received invite, show pending response label
const GAME_INVITE_SUCCESS = exports.GAME_INVITE_SUCCESS = 'GAME_INVITE_SUCCESS';
// failed to send it, retry?
const GAME_INVITE_FAILURE = exports.GAME_INVITE_FAILURE = 'GAME_INVITE_FAILURE';
// notify a friend wants to play, allow notification to respond,
// additionally show accept/decline buttons in lobby friends list
const RECEIVE_GAME_INVITE = exports.RECEIVE_GAME_INVITE = 'RECEIVE_GAME_INVITE';
const DECLINE_GAME_INVITE_REQUEST = exports.DECLINE_GAME_INVITE_REQUEST = 'DECLINE_GAME_INVITE_REQUEST';
const DECLINE_GAME_INVITE_SUCCESS = exports.DECLINE_GAME_INVITE_SUCCESS = 'DECLINE_GAME_INVITE_SUCCESS';
const DECLINE_GAME_INVITE_FAILURE = exports.DECLINE_GAME_INVITE_FAILURE = 'DECLINE_GAME_INVITE_FAILURE';
const RECEIVE_GAME_INVITE_DECLINED = exports.RECEIVE_GAME_INVITE_DECLINED = 'RECEIVE_GAME_INVITE_DECLINED';
const ACCEPT_GAME_INVITE_REQUEST = exports.ACCEPT_GAME_INVITE_REQUEST = 'ACCEPT_GAME_INVITE_REQUEST';
// two friends wants to play, show button for launching the match
const ACCEPT_GAME_INVITE_SUCCESS = exports.ACCEPT_GAME_INVITE_SUCCESS = 'ACCEPT_GAME_INVITE_SUCCESS';
const ACCEPT_GAME_INVITE_FAILURE = exports.ACCEPT_GAME_INVITE_FAILURE = 'ACCEPT_GAME_INVITE_FAILURE';
// same as ACCEPT_GAME_INVITE_SUCCESS
const RECEIVE_GAME_INVITE_ACCEPTED = exports.RECEIVE_GAME_INVITE_ACCEPTED = 'RECEIVE_GAME_INVITE_ACCEPTED';
const CANCEL_GAME_INVITE_REQUEST = exports.CANCEL_GAME_INVITE_REQUEST = 'CANCEL_GAME_INVITE_REQUEST';
const CANCEL_GAME_INVITE_SUCCESS = exports.CANCEL_GAME_INVITE_SUCCESS = 'CANCEL_GAME_INVITE_SUCCESS';
const CANCEL_GAME_INVITE_FAILURE = exports.CANCEL_GAME_INVITE_FAILURE = 'CANCEL_GAME_INVITE_FAILURE';
const RECEIVE_GAME_INVITE_CANCELLED = exports.RECEIVE_GAME_INVITE_CANCELLED = 'RECEIVE_GAME_INVITE_CANCELLED';
// transition to new view, show loading status, server sets up a new socket channel for the match and we join it
const NEW_GAME_REQUEST = exports.NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
// lovely, payload will tell us if we're waiting for our friend to join'
const NEW_GAME_SUCCESS = exports.NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';
// failed, allow retrying
const NEW_GAME_FAILURE = exports.NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
const JOIN_GAME_REQUEST = exports.JOIN_GAME_REQUEST = 'JOIN_GAME_REQUEST';
const JOIN_GAME_SUCCESS = exports.JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS';
const JOIN_GAME_FAILURE = exports.JOIN_GAME_FAILURE = 'JOIN_GAME_FAILURE';
const RECEIVE_NEW_GAME = exports.RECEIVE_NEW_GAME = 'RECEIVE_NEW_GAME';
// our opponent joined the game
const RECEIVE_JOIN_GAME = exports.RECEIVE_JOIN_GAME = 'RECEIVE_JOIN_GAME';

// actions for setting up our own battleship formation
const ADD_ITEM = exports.ADD_ITEM = 'ADD_ITEM';
const MOVE_ITEM = exports.MOVE_ITEM = 'MOVE_ITEM';
const ROTATE_ITEM = exports.ROTATE_ITEM = 'ROTATE_ITEM';
const REMOVE_ITEM = exports.REMOVE_ITEM = 'REMOVE_ITEM';
const RESET_ITEMS = exports.RESET_ITEMS = 'RESET_ITEMS';
const LOAD_ITEMS = exports.LOAD_ITEMS = 'LOAD_ITEMS';
const RANDOM_ITEMS = exports.RANDOM_ITEMS = 'RANDOM_ITEMS';

// attempting to start the game
const LOAD_GAME_REQUEST = exports.LOAD_GAME_REQUEST = 'LOAD_GAME_REQUEST';
// payload contains who is to make the first move
const LOAD_GAME_SUCCESS = exports.LOAD_GAME_SUCCESS = 'LOAD_GAME_SUCCESS';
const LOAD_GAME_FAILURE = exports.LOAD_GAME_FAILURE = 'LOAD_GAME_FAILURE';

// Game has begun, not our turn
const RECEIVE_READY = exports.RECEIVE_READY = 'RECEIVE_READY';
// Game has begun, we got first move
const RECEIVE_WAITING = exports.RECEIVE_WAITING = 'RECEIVE_WAITING';

// aim our cannons!
const PLACE_CROSSHAIRS = exports.PLACE_CROSSHAIRS = 'PLACE_CROSSHAIRS';

// fire the cannon, perhaps show a cannon firing to entertain the user while waiting
const FIRE_CANNON_REQUEST = exports.FIRE_CANNON_REQUEST = 'FIRE_CANNON_REQUEST';
// payload tells us if it's hit or miss
const FIRE_CANNON_SUCCESS = exports.FIRE_CANNON_SUCCESS = 'FIRE_CANNON_SUCCESS';
// try firing it again!
const FIRE_CANNON_FAILURE = exports.FIRE_CANNON_FAILURE = 'FIRE_CANNON_FAILURE';
// oh blimey, we got hit! Retaliate!
const RECEIVE_HIT = exports.RECEIVE_HIT = 'RECEIVE_HIT';
// wow that was close, fire back while they're reloading!
const RECEIVE_MISS = exports.RECEIVE_MISS = 'RECEIVE_MISS';
// yay, all ships are down, go brag about it!
const RECEIVE_VICTORY = exports.RECEIVE_VICTORY = 'RECEIVE_VICTORY';
// oh well… maybe next time?
const RECEIVE_DEFEAT = exports.RECEIVE_DEFEAT = 'RECEIVE_DEFEAT';

// because some of us got a social life
const PAUSE_GAME_REQUEST = exports.PAUSE_GAME_REQUEST = 'PAUSE_GAME_REQUEST';
const PAUSE_GAME_SUCCESS = exports.PAUSE_GAME_SUCCESS = 'PAUSE_GAME_SUCCESS';
const PAUSE_GAME_FAILURE = exports.PAUSE_GAME_FAILURE = 'PAUSE_GAME_FAILURE';
const RECEIVE_GAME_PAUSE = exports.RECEIVE_GAME_PAUSE = 'RECEIVE_GAME_PAUSE';
const RESUME_GAME_REQUEST = exports.RESUME_GAME_REQUEST = 'RESUME_GAME_REQUEST';
const RESUME_GAME_SUCCESS = exports.RESUME_GAME_SUCCESS = 'RESUME_GAME_SUCCESS';
const RESUME_GAME_FAILURE = exports.RESUME_GAME_FAILURE = 'RESUME_GAME_FAILURE';
const RECEIVE_GAME_RESUME = exports.RECEIVE_GAME_RESUME = 'RECEIVE_GAME_RESUME';
// some of your friends may be quitters
const LEAVE_GAME_REQUEST = exports.LEAVE_GAME_REQUEST = 'LEAVE_GAME_REQUEST';
const LEAVE_GAME_SUCCESS = exports.LEAVE_GAME_SUCCESS = 'LEAVE_GAME_SUCCESS';
const LEAVE_GAME_FAILURE = exports.LEAVE_GAME_FAILURE = 'LEAVE_GAME_FAILURE';
const RECEIVE_GAME_LEAVE = exports.RECEIVE_GAME_LEAVE = 'RECEIVE_GAME_LEAVE';

// its sad to see them go, but we have to let them
const LOGOUT_REQUEST = exports.LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = exports.LOGOUT_FAILURE = 'LOGOUT_FAILURE';