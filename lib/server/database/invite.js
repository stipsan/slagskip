'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewerDeclinesInvite = exports.viewerAcceptsInvite = exports.viewerCancelsInvite = exports.viewerSendsInvite = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const viewerSendsInvite = exports.viewerSendsInvite = (viewerAuthToken, friendId, redis) => {
  (0, _invariant2.default)(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property');
  (0, _invariant2.default)(friendId, 'Invalid `friendId` argument');

  return redis.sadd(`user:${ friendId }:invites`, viewerAuthToken.id).then(didSendInvite => {
    (0, _invariant2.default)(didSendInvite, 'Failed to send invite');

    return {
      id: friendId,
      inviteOut: true
    };
  });
};

const viewerCancelsInvite = exports.viewerCancelsInvite = (viewerAuthToken, friendId, redis) => {
  (0, _invariant2.default)(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property');
  (0, _invariant2.default)(friendId, 'Invalid `friendId` argument');

  return redis.srem(`user:${ friendId }:invites`, viewerAuthToken.id).then(didCancelInvite => {
    (0, _invariant2.default)(didCancelInvite, 'Failed to cancel invite');

    return {
      id: friendId,
      inviteOut: false
    };
  });
};
const viewerAcceptsInvite = exports.viewerAcceptsInvite = (viewerAuthToken, friendId, redis) => {
  (0, _invariant2.default)(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property');
  (0, _invariant2.default)(friendId, 'Invalid `friendId` argument');

  return redis.sadd(`user:${ friendId }:invites`, viewerAuthToken.id).then(didAcceptInvite => {
    (0, _invariant2.default)(didAcceptInvite, 'Failed to accept invite');

    return {
      id: friendId,
      inviteOut: true
    };
  });
};
const viewerDeclinesInvite = exports.viewerDeclinesInvite = (viewerAuthToken, friendId, redis) => {
  (0, _invariant2.default)(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property');
  (0, _invariant2.default)(friendId, 'Invalid `friendId` argument');

  return redis.srem(`user:${ viewerAuthToken.id }:invites`, friendId).then(didDeclineInvite => {
    (0, _invariant2.default)(didDeclineInvite, 'Failed to decline invite');

    return {
      id: friendId,
      inviteIn: false
    };
  });
};