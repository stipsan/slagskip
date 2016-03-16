var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

// @TODO move this into env
const autoReconnectOptions = {
  initialDelay: 10000,
  randomness: 10000,
  multiplier: 1.5,
  maxDelay: 60000,
};

var plugins = process.env.NODE_ENV === 'production' ? [
  new webpack.DefinePlugin({
    'process.env.AUTO_RECONNECT_OPTIONS': 'null',
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_console: true,
    }
})
] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.AUTO_RECONNECT_OPTIONS': JSON.stringify(
        Object.assign({}, autoReconnectOptions, {
          initialDelay: 1000,
          randomness: 1000,
          maxDelay: 10000,
        })
      ),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ];

plugins = plugins.concat(new ExtractTextPlugin("[name].css?[hash]", {
  allChunks: true,
  disable: process.env.NODE_ENV !== 'production'
}));

// JSX syntax is transpiled to React.createElement calls with babel, which is why devs
// often do `import React from 'react'` even if `React` itself isn't used in the source.
// it's also why variations like `import React, {Component, PropTypes} from 'react'` is seen in the wild.
// However, when modules can be inlined using `transform-react-inline-elements`
// importing `React` isn't necessary as babel replaces the JSX with whatever the React.createElement
// returns on the call-site, reducing bloat and laying the ground work for tree shaking in webpack v2
plugins = plugins.concat(new webpack.ProvidePlugin({
  React: 'react',
}));

const babelPlugins = {
  "production": [
    "transform-react-constant-elements",
    "transform-react-inline-elements",
    ],
  "development":  [
    ["react-transform", {
      "transforms": [{
        "transform": "react-transform-hmr",
        "imports": ["react"],
        "locals": ["module"],
      }, {
        "transform": "react-transform-catch-errors",
        "imports": ["react", "redbox-react"],
      }]
    }]
  ]
};

var AssetsPlugin = require('assets-webpack-plugin');
plugins = plugins.concat(new AssetsPlugin({filename: 'assets.json', path: path.join(__dirname, 'server')}));

var entry = process.env.NODE_ENV !== 'production' ? {
    client: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      './client/index'
    ]
  } : {
    client: [
      './client/index'
    ]
  };

module.exports = {
  devtool: 'production' !== process.env.NODE_ENV && 'eval',
  entry: entry,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: 'http://localhost:8080/',
    hot: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js?[hash]",
    chunkFilename: "[name].js?[chunkhash]",
    publicPath: 'production' === process.env.NODE_ENV ? '/' : 'http://localhost:8080/'
  },
  plugins: plugins,
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["react", "es2015", "stage-0"],
          "plugins": babelPlugins[process.env.NODE_ENV === 'development' ? 'development' : 'production']
        },
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass') }
    ]
  }
};