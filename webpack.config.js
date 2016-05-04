const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const devServerHostName = process.env.DEV_SERVER_HOST_NAME || 'localhost'
const devServerPort = process.env.DEV_SERVER_PORT || '8080'

// @TODO move this into env
const provideDefaults = {
  'process.env.AUTO_RECONNECT_OPTIONS': JSON.stringify({
    initialDelay: 10000,
    randomness: 10000,
    multiplier: 1.5,
    maxDelay: 60000,
  }),
  'process.env.SOCKET_HOSTNAME': JSON.stringify(process.env.SOCKET_HOSTNAME),
}

let plugins = 'production' === process.env.NODE_ENV ? [
  new webpack.DefinePlugin(Object.assign({}, provideDefaults, {
    'process.env.AUTO_RECONNECT_OPTIONS': 'null',
    'process.env.NODE_ENV': JSON.stringify('production'),
  })),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unsafe: true,
      drop_console: true,
      warnings: false,
      pure_getters: true,
      unsafe_comps: true,
    },
    comments: false,
    mangle: {
      sort: true,
      toplevel: true,
      eval: true,
      properties: true,
    }
  }),
] : [
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin(Object.assign({}, provideDefaults, {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  })),
]

plugins = plugins.concat(new ExtractTextPlugin('[hash].css', {
  allChunks: true,
  disable: 'production' !== process.env.NODE_ENV,
}))

/**
 * JSX syntax is transpiled to React.createElement calls with babel, which is why devs
 * often do `import React from 'react'` even if `React` itself isn't used in the source.
 * it's also why variations like `import React, {Component, PropTypes} from 'react'`
 * is seen in the wild.
 * However, when modules can be inlined using `transform-react-inline-elements`
 * importing `React` isn't necessary as babel replaces the JSX with whatever
 * the React.createElement returns on the call-site, reducing bloat and laying the ground work
 * for tree shaking in webpack v2
 */
plugins = plugins.concat(new webpack.ProvidePlugin({
  React: 'react',
}))

const AssetsPlugin = require('assets-webpack-plugin')
plugins = plugins.concat(new AssetsPlugin({ filename: 'assets.json', path: __dirname }))

const entry = 'production' === process.env.NODE_ENV ? {
  client: [
    'babel-polyfill',
    './src/client/index',
  ],
} : {
  client: [
    `webpack-dev-server/client?http://${devServerHostName}:${devServerPort}/`,
    'webpack/hot/dev-server',
    'babel-polyfill',
    './src/client/index',
  ],
}

const localIdentName = 'production' === process.env.NODE_ENV ?
   '&localIdentName=[hash:base64:4]' : '&localIdentName=[local]__[hash:base64:2]'
// https://github.com/webpack/css-loader/blob/6ade74035c845978e3cf4026bdacb829fcf300d7/lib/processCss.js#L181
const cssnanoOptIn = '&zindex&normalizeUrl&discardUnused&mergeIdents&discardDuplicates&reduceIdents'
const importLoaders = '&importLoaders=3'

module.exports = {
  devtool: 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map',
  entry,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: `http://${devServerHostName}:${devServerPort}/`,
    hot: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  bulmaLoader: {
    theme: 'src/client/style/_bulma.scss',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'production' === process.env.NODE_ENV ? '[hash].js' : '[name].js?[hash]',
    chunkFilename: 'production' === process.env.NODE_ENV ?
                   '[chunkhash].js' : '[name].js?[chunkhash]',
    publicPath: 'production' === process.env.NODE_ENV ?
                '/' : `http://${devServerHostName}:${devServerPort}/`,
  },
  plugins,
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json' },
    ],
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.scss$/, loaders: [
        'classnames',
        ExtractTextPlugin.extract(
           'style',
           `css?modules${cssnanoOptIn}${importLoaders}${localIdentName}!autoprefixer!sass!bulma`
         )
      ] },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
}
