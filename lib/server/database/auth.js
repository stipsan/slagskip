'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _user = require('./user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticate = exports.authenticate = (credentials, redis) => {
  return redis.hget('users', credentials.username).then(userId => {

    //invariant(userId > 0, `No user with that username!`)
    if (!userId) {
      return (0, _user.createUser)(credentials, redis);
    }

    return {
      id: userId,
      username: credentials.username,
      privateChannel: `user:${ userId }`
    };
  });
};