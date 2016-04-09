'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFriends = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const getFriends = exports.getFriends = (viewer, redis) => {
  (0, _invariant2.default)(viewer.id, 'Invalid viewer, missing `id` property');
  (0, _invariant2.default)(viewer.friends, 'Invalid viewer, missing `friends` property');
  (0, _invariant2.default)(viewer.invites, 'Invalid viewer, missing `invites` property');

  const viewerId = viewer.id;
  const pipeline = viewer.friends.reduce((previousValue, currentValue) => [].concat(_toConsumableArray(previousValue), [['hgetall', `user:${ currentValue }`], ['sismember', `user:${ currentValue }:invites`, viewerId]]), []);
  return redis.multi(pipeline).exec().then(results => {
    let i = 0;
    return results.reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex % 2 === 0) {
        currentValue[1].inviteIn = viewer.invites.indexOf(currentValue[1].id) !== -1;
        previousValue[i++] = currentValue[1];
      } else {
        previousValue[i - 1].inviteOut = !!currentValue[1];
      }
      return previousValue;
    }, []);
  });
};