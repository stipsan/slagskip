/**
 * Heroku terminology labels a 'worker' process as a background task that do
 * not handle incoming web requests or do web server-y things.
 * SocketCluster terminology puts server work in a 'worker'.
 * This file is called web.js as it's what Heroku will run in  a 'web' dyno,
 * not a 'worker' dyno.
 */

module.exports.run = function (worker) {
  console.info('   >> Worker PID:', process.pid);

  // this is only to allow import/export syntax in /shared/* to be supported on node
  // until --harmony_modules is stable in v8 and lands in node

  require('babel-register')({
    only: /shared/,
    plugins: ['transform-es2015-modules-commonjs'],
  });

  const express = require('express');
  const app = express();
  
  app.use(require('compression')());

  // Security reasons, this should be the default in express, 
  // at least when NODE_ENV = production
  app.set('x-powered-by', false);

  // We are on Heroku after all, behind load balancers 
  // and want our https and wss to work properly with the IPs
  app.enable('trust proxy');

  /*
  if(process.env.NODE_ENV !== 'production') {
    const config   = require('../../webpack.config');
    const compiler = require('webpack')(config);
    app.use(require('webpack-dev-middleware')(compiler, config.devServer));
    //@TODO the socket.io that the middleware uses breaks on SocketCluster
    app.use(require('webpack-hot-middleware')(compiler));
  }
  //*/

  app.use(express.static('public'));
  app.use(require('./html')());
  
  worker.httpServer.on('request', app);
  
  require('./sockets')(worker);
};