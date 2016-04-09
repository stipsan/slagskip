'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _origins = require('./middleware/origins');

var _origins2 = _interopRequireDefault(_origins);

var _html = require('./middleware/html');

var _html2 = _interopRequireDefault(_html);

var _database = require('../database');

var _socket = require('./socket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = exports.run = worker => {
  const app = (0, _express2.default)();
  const redis = (0, _database.createConnection)(process.env.REDIS_URL || '127.0.0.1:6379');

  // Security reasons, this should be the default in express
  app.set('x-powered-by', false);
  // We are on Heroku after all, behind load balancers
  // and want our https and wss to work properly with the IPs
  app.enable('trust proxy');

  app.use((0, _compression2.default)());
  app.use((0, _origins2.default)());
  /*
  if(process.env.NODE_ENV !== 'production') {
    const config   = require('../../webpack.config');
    const compiler = require('webpack')(config);
    app.use(require('webpack-dev-middleware')(compiler, config.devServer));
    //@TODO the socket.io that the middleware uses breaks on SocketCluster
    app.use(require('webpack-hot-middleware')(compiler));
  }
  //*/
  app.use(_express2.default.static('public', { maxAge: 86400000 * 365, index: false }));
  app.use((0, _html2.default)());

  worker.httpServer.on('request', app);

  (0, _socket.createSocketServer)((0, _socket.applySocketMiddleware)(worker.scServer), redis);
};