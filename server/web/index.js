var SocketCluster = require('socketcluster').SocketCluster;

var socketCluster = new SocketCluster({
  workers: Number(process.env.WEB_CONCURRENCY) || 1,
  port: process.env.PORT || 5000,
  workerController: __dirname + '/worker.js',
  path: '/ws',
  logLevel: 'production' === process.env.NODE_ENV ? 1 : 3,
  authKey: process.env.AUTH_KEY,
});

// @TODO move to broker so we can reload using sigterm and run migrations without pain
require('../migrate')