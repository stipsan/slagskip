var sticky = require('sticky-cluster'),
    options = {
      concurrency: process.env.WEB_CONCURRENCY || 1,
      port: process.env.PORT || 5000,
      debug: process.env.NODE_ENV !== 'production'
    };

//@TODO implement ability to decide wether this is a socket endpoint, assets endpoint or both

function start(callback) {
  var sticky = require('sticky-session');
  var express = require('express');
  var path = require('path');
  var html = require('./html');

  var app = express();
  var server  = require('http').createServer(app);
  var io = require('socket.io')(server);
  var redis = require('socket.io-redis');
  io.adapter(redis({ host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 }));

  // Security reasons
  app.set('x-powered-by', false);

  // We are on Heroku after all, behind load balancers
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

  app.use(express.static('public'));
  app.use(html());

  /*
  server.listen(PORT, function() {
    console.log('Node app is running on port', PORT);
  });
  //*/
  // don't do server.listen(), just pass server instance into the sticky module
  callback(server);

  // setup socket.io logic
  require('./sockets.js')(io);
};

sticky(start, options);