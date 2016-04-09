'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setViewerOffline = exports.getViewer = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getViewer = exports.getViewer = (authToken, redis) => {
  (0, _invariant2.default)(authToken.id, 'Invalid authToken, missing `id` property');

  const viewerId = authToken.id;

  return redis.multi([['hvals', 'users'], ['smembers', `user:${ viewerId }:invites`], ['smembers', `games:${ viewerId }`], ['hset', `user:${ viewerId }`, 'online', 1]]).exec().then(results => {
    const friendIds = results[0][1];
    const invites = results[1][1];
    const games = results[2][1];

    // @FIXME
    friendIds.splice(friendIds.indexOf(viewerId), 1);

    return { friendIds, invites, games };
  });
};

const setViewerOffline = exports.setViewerOffline = (viewerAuthToken, lastVisit, redis) => {
  (0, _invariant2.default)(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property');
  (0, _invariant2.default)(lastVisit, 'Invalid `lastVisit` argument');

  return redis.hmset(`user:${ viewerAuthToken.id }`, 'online', 0, 'lastVisit', lastVisit).then(result => {
    (0, _invariant2.default)(result === 'OK', 'Failed to set user offline status');

    return {
      id: viewerAuthToken.id,
      online: '0',
      lastVisit
    };
  });
};