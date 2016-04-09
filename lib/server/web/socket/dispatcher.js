'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDispatcher = undefined;

var _store = require('../../store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./actions');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const createDispatcher = exports.createDispatcher = (socket, database, redis) => {
  const store = (0, _store2.default)();

  const handleDispatch = (_ref, callback) => {
    let type = _ref.type;

    let action = _objectWithoutProperties(_ref, ['type']);

    if (!_actions.actions.hasOwnProperty(type)) {
      console.error(`Action type ${ type } does not exist!`);
      return callback(404, `Action type ${ type } does not exist!`);
    }

    return store.dispatch(_actions.actions[type](action, callback, socket, database, redis));
  };

  socket.on('dispatch', handleDispatch);

  // pass the handler so it can be used in socket.off('dispatch') in the caller
  return handleDispatch;
};