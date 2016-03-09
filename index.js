const oneDay = 86400000;
const port = process.env.PORT || 5000;
var fallback = require('@stipsan/express-history-api-fallback');
var express = require('express');
var path = require('path');

var app = express();

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
app.use(fallback('index.html', {root: path.join(__dirname, 'public')}));

app.listen(port, function() {
  console.log('Node app is running on port', app.get('port'));
});