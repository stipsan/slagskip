const oneDay = 86400000;
const port = process.env.PORT || 5000;
var fallback = require('@stipsan/express-history-api-fallback');
var express = require('express');

var app = express();

// Security reasons
app.set('x-powered-by', false);

// We are on Heroku after all, behind load balancers
app.enable('trust proxy');

app.use(express.static('public'));
app.use(fallback(function(req, res, next) {
  res.send('success');
}));

if(process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('static', { maxAge: oneDay * 360 }));
} else {
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

app.listen(port, function() {
  console.log('Node app is running on port', app.get('port'));
});