var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = process.env.NODE_ENV === 'production' ? [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
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

var AssetsPlugin = require('assets-webpack-plugin');
plugins = plugins.concat(new AssetsPlugin({filename: 'assets.json', path: path.join(__dirname, 'server')}));

var entry = process.env.NODE_ENV !== 'production' ? {
    client: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server?http://localhost:8080/',
      './client/index'
    ]
  } : {
    client: [
      './client/index'
    ]
  };

module.exports = {
  devtool: 'eval',
  entry: entry,
  devServer: {
    noInfo: true,
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js?[hash]",
    chunkFilename: "[name].js?[chunkhash]",
    publicPath: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : '/'
  },
  plugins: plugins,
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass') }
    ]
  }
};