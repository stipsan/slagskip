'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketServer = undefined;

var _dispatcher = require('./dispatcher');

var _database = require('../../database');

var database = _interopRequireWildcard(_database);

var _ActionTypes = require('../../constants/ActionTypes');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const createSocketServer = exports.createSocketServer = (scServer, redis) => {

  scServer.on('connection', function (socket) {
    // @TODO handle .off to cleanup disconnected clients
    const dispatchEventHandler = (0, _dispatcher.createDispatcher)(socket, database, redis);

    //console.log(process.pid, 'a user connected', authToken);

    socket.on('disconnect', () => {
      if (socket.authToken) {
        const id = socket.authToken.id;
        const lastVisit = new Date().toJSON();
        dispatchEventHandler({
          type: _ActionTypes.RECEIVE_FRIEND_NETWORK_STATUS,
          online: '0',
          lastVisit,
          id
        });

        console.log('socket.on.disconnect');
        socket.once('connect', () => {
          console.log('socket.once.connect');
        });
        /*scServer.exchange.publish('service', {
          type: TYPES.RECEIVE_FRIEND_NETWORK_STATUS,
          id: socket.authToken.id,
          username: socket.authToken.username
        })*/
      }
    });
  });
};