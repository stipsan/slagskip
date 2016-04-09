'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _walle = require('./walle');

var _walle2 = _interopRequireDefault(_walle);

var _r2d = require('./r2d2');

var _r2d2 = _interopRequireDefault(_r2d);

var _k = require('./k9');

var _k2 = _interopRequireDefault(_k);

var _marvin = require('./marvin');

var _marvin2 = _interopRequireDefault(_marvin);

var _hal = require('./hal');

var _hal2 = _interopRequireDefault(_hal);

var _glados = require('./glados');

var _glados2 = _interopRequireDefault(_glados);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bots = {
  "-1": _walle2.default,
  "-2": _r2d2.default,
  "-3": _k2.default,
  "-4": _marvin2.default,
  "-5": _hal2.default,
  "-6": _glados2.default
};
exports.default = bots;