var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

// @TODO move this into env
const autoReconnectOptions = {
  initialDelay: 10000,
  randomness: 10000,
  multiplier: 1.5,
  maxDelay: 60000,
}
const provideDefaults = {
  'process.env.AUTO_RECONNECT_OPTIONS': JSON.stringify(
    Object.assign({}, autoReconnectOptions, {
      initialDelay: 1000,
      randomness: 1000,
      maxDelay: 10000,
    })
  ),
  'process.env.SOCKET_HOSTNAME': JSON.stringify(process.env.SOCKET_HOSTNAME),
  'process.env.SOCKET_PATH': JSON.stringify(process.env.SOCKET_PATH),
}

var plugins = process.env.NODE_ENV === 'production' ? [
  new webpack.DefinePlugin(Object.assign({}, provideDefaults, {
    'process.env.AUTO_RECONNECT_OPTIONS': 'null',
    'process.env.NODE_ENV': JSON.stringify('production'),
  })),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.AggressiveMergingPlugin({
    moveToParents: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    screw_ie8: true,
    wrap: true,
    compress: {
      unsafe: true, // could use Bugsnag in case we get trouble when live
      drop_console: true,
      warnings: false,
    },
    mangle: {
      toplevel: true,
      eval: true,
    },
    comments: false,
    mangleProps: true,
  }),
] : [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin(Object.assign({}, provideDefaults, {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  })),
]

plugins = plugins.concat(new ExtractTextPlugin('[hash].css', {
  allChunks: true,
  disable: process.env.NODE_ENV !== 'production',
}))

// JSX syntax is transpiled to React.createElement calls with babel, which is why devs
// often do `import React from 'react'` even if `React` itself isn't used in the source.
// it's also why variations like `import React, {Component, PropTypes} from 'react'` is seen in the wild.
// However, when modules can be inlined using `transform-react-inline-elements`
// importing `React` isn't necessary as babel replaces the JSX with whatever the React.createElement
// returns on the call-site, reducing bloat and laying the ground work for tree shaking in webpack v2
plugins = plugins.concat(new webpack.ProvidePlugin({
  React: 'react',
}))

var AssetsPlugin = require('assets-webpack-plugin')
plugins = plugins.concat(new AssetsPlugin({filename: 'assets.json', path: path.join(__dirname, 'server')}))

var entry = process.env.NODE_ENV !== 'production' ? {
  client: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    './client/index',
  ],
} : {
  client: [
    './client/index',
  ],
}

const localIdentName = 'production' !== process.env.NODE_ENV ?
  '[name]__[local]___[hash:base64:5]' : '[hash:base64]'

module.exports = {
  devtool: 'production' !== process.env.NODE_ENV && 'eval',
  entry: entry,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: 'http://localhost:8080/',
    hot: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'production' === process.env.NODE_ENV ? '[hash].js' : '[name].js?[hash]',
    chunkFilename: 'production' === process.env.NODE_ENV ? '[chunkhash].js' : '[name].js?[chunkhash]',
    publicPath: 'production' === process.env.NODE_ENV ? '/' : 'http://localhost:8080/',
  },
  plugins: plugins,
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=${localIdentName}!autoprefixer!sass`) },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
}