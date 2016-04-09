'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.friendsRequest = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ActionTypes = require('../constants/ActionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const friendsRequest = exports.friendsRequest = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  const friendIds = getState().getIn(['viewer', 'friendIds']);
  const invites = getState().getIn(['viewer', 'invites']);
  return database.getFriends({
    id: authToken.id,
    friends: friendIds,
    invites
  }, redis).then(friends => {
    callback(null, { type: _ActionTypes.FRIENDS_SUCCESS, friends });
  }).catch(error => {
    console.error(_ActionTypes.FRIENDS_FAILURE, error);
    callback(_ActionTypes.FRIENDS_FAILURE, error);
  });
};