'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ioredis = require('ioredis');

var _ioredis2 = _interopRequireDefault(_ioredis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createConnection = exports.createConnection = url => {
  (0, _invariant2.default)(url, 'You must specify an redis url');

  return new _ioredis2.default(url);
};