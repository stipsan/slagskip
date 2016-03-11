var throng = require('throng');

//@TODO implement ability to decide wether this is a socket endpoint, assets endpoint or both

const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT || 5000;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start(id) {
  var sticky = require('sticky-session');
  var express = require('express');
  var path = require('path');
  var html = require('./server/html');

  var app = express();
  var server  = require('http').createServer(app);
  var io = require('socket.io')(server);

  // Security reasons
  app.set('x-powered-by', false);

  // We are on Heroku after all, behind load balancers
  app.enable('trust proxy');

  if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpack = require("webpack");
    var config = require('./webpack.config');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  }

  app.use(express.static('public'));
  app.use(html());

  server.listen(PORT, function() {
    console.log('Node app is running on port', PORT, 'with worker id', id);
  });

  // setup socket.io logic
  require('./server/sockets.js')(io, id);
};