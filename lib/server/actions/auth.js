'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadcastNetworkStatus = exports.deauthenticateRequest = exports.authenticateRequest = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ActionTypes = require('../constants/ActionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticateRequest = exports.authenticateRequest = (_ref, callback, socket, database, redis) => {
  let username = _ref.username;
  return (dispatch, getState) => {
    return database.authenticate({ username }, redis).then(authToken => {
      // sc will send this data to the client
      socket.setAuthToken(authToken);

      const successAction = {
        type: _ActionTypes.AUTHENTICATE_SUCCESS,
        authToken: socket.getAuthToken()
      };

      callback(null, successAction);

      return database.getViewer(authToken, redis);
    }).catch(error => {
      console.error(_ActionTypes.AUTHENTICATE_FAILURE, error);
      callback(_ActionTypes.AUTHENTICATE_FAILURE, error);
      throw error;
    }).then(viewer => {
      (0, _invariant2.default)(viewer.friendIds, 'database.getViewer failed to return friendIds');
      (0, _invariant2.default)(viewer.invites, 'database.getViewer failed to return invites');
      (0, _invariant2.default)(viewer.games, 'database.getViewer failed to return games');

      dispatch({
        type: _ActionTypes.RECEIVE_VIEWER,
        friendIds: viewer.friendIds,
        invites: viewer.invites,
        games: viewer.games
      });
      const friendIds = getState().getIn(['viewer', 'friendIds']);
      const games = getState().getIn(['viewer', 'games']);
      socket.emit('dispatch', {
        type: _ActionTypes.RECEIVE_VIEWER,
        friendIds,
        games
      });
      const authToken = socket.getAuthToken();
      const exchangeAction = {
        type: _ActionTypes.RECEIVE_FRIEND_NETWORK_STATUS,
        id: authToken.id,
        online: '1',
        lastVisit: new Date().toJSON()
      };
      viewer.friendIds.forEach(friendId => {
        socket.exchange.publish(`user:${ friendId }`, exchangeAction);
      });
    }).catch(error => {
      console.error(error);
    });
  };
};

const deauthenticateRequest = exports.deauthenticateRequest = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  const lastVisit = new Date().toJSON();
  return database.setViewerOffline(socket.getAuthToken(), lastVisit, redis).then(offlineAuthToken => {
    const friendIds = getState().getIn(['viewer', 'friendIds']);
    const exchangeAction = {
      type: _ActionTypes.RECEIVE_FRIEND_NETWORK_STATUS,
      id: authToken.id,
      online: '0',
      lastVisit
    };
    friendIds.forEach(friendId => {
      socket.exchange.publish(`user:${ friendId }`, exchangeAction);
    });

    socket.kickOut(`user:${ authToken.id }`);
    socket.deauthenticate();

    callback(null, { type: _ActionTypes.DEAUTHENTICATE_SUCCESS, authToken });
  }).catch(error => {
    console.error(_ActionTypes.DEAUTHENTICATE_FAILURE, error);
    callback(_ActionTypes.DEAUTHENTICATE_FAILURE, error);
  });
};

const broadcastNetworkStatus = exports.broadcastNetworkStatus = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const id = action.id;
  const lastVisit = action.lastVisit;
  const online = action.online;

  return database.getViewer({ id }, redis).then(viewer => {
    (0, _invariant2.default)(viewer.friendIds, 'database.getViewer failed to return friendIds');

    const exchangeAction = {
      type: _ActionTypes.RECEIVE_FRIEND_NETWORK_STATUS,
      online,
      lastVisit,
      id
    };
    viewer.friendIds.forEach(friendId => {
      socket.exchange.publish(`user:${ friendId }`, exchangeAction);
    });

    if (online === '0') {
      return database.setViewerOffline(socket.getAuthToken(), lastVisit, redis);
    }
  });
};