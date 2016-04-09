'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUser = exports.createUser = (userData, redis) => {
  (0, _invariant2.default)(userData.username, 'Invalid userData, missing `username` property');

  //const usernameKey = userData.username.toLowerCase()
  return redis.hget('users', userData.username).then(usernameTaken => {

    (0, _invariant2.default)(!usernameTaken, `Username not available`);

    return redis.incr('user_next');
  }).then(userId => {
    return redis.multi([['hsetnx', 'users', userData.username, userId], ['hsetnx', `user:${ userId }`, 'id', userId], ['hsetnx', `user:${ userId }`, 'username', userData.username]]).exec();
  }).then(results => {
    const didUpdateUsersList = results[0][1];
    const didSetUserId = results[1][1];
    const didSetUsername = results[2][1];
    (0, _invariant2.default)(didUpdateUsersList && didSetUserId && didSetUsername, `Failed to create user`);

    return (0, _auth.authenticate)(userData, redis);
  });
};