var SocketCluster = require('socketcluster').SocketCluster;

// running the migration right away, so the server don't start serving until we're ready
require('../migrate')

var socketCluster = new SocketCluster({
  workers: Number(process.env.WEB_CONCURRENCY) || 1,
  port: process.env.PORT || 5000,
  workerController: __dirname + '/worker.js',
  initController: __dirname + '/init.js',
  path: '/ws',
  logLevel: 'production' === process.env.NODE_ENV ? 1 : 3,
  authKey: process.env.AUTH_KEY,
});