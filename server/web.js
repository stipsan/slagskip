/**
 * Heroku terminology labels a 'worker' process as a background task that do
 * not handle incoming web requests or do web server-y things.
 * SocketCluster terminology puts server work in a 'worker'.
 * This file is called web.js as it's what Heroku will run in  a 'web' dyno,
 * not a 'worker' dyno.
 */

module.exports.run = function (worker) {
  
  console.log('   >> Worker PID:', process.pid);
  
  const express = require('express');
  const app = express();
  
  const httpServer = worker.httpServer;
  const scServer = worker.scServer;

  // Security reasons, this should be the default in express, 
  // at least when NODE_ENV = production
  app.set('x-powered-by', false);

  // We are on Heroku after all, behind load balancers 
  // and want our https and wss to work properly with the IPs
  app.enable('trust proxy');

  if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpack = require("webpack");
    var config = require('../webpack.config');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  }

  const html = require('./html');
  app.use(express.static('public'));
  app.use(html());
  
  httpServer.on('request', app);
  
  require('./sockets.js')(scServer);
};