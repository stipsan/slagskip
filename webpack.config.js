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

var AssetsPlugin = require('assets-webpack-plugin');
plugins = plugins.concat(new AssetsPlugin({filename: 'assets.json'}));

var entry = process.env.NODE_ENV !== 'production' ? {
    client: [
      'webpack-hot-middleware/client',
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
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js?[hash]",
    chunkFilename: "[name].js?[chunkhash]",
    publicPath: '/'
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
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer') }
    ]
  }
};