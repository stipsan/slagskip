var SocketCluster = require('socketcluster').SocketCluster;

var socketCluster = new SocketCluster({
  workers: Number(process.env.WEB_CONCURRENCY) || 1,
  port: process.env.PORT || 5000,
  workerController: __dirname + '/worker.js',
});
