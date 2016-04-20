var SocketCluster = require('socketcluster').SocketCluster

// running the migration right away, so the server don't start serving until we're ready
require('../migrate')

new SocketCluster({
  workers: Number(process.env.WEB_CONCURRENCY) || 1,
  port: process.env.PORT || 5000,
  workerController: __dirname + '/worker.js',
  // Using babel transpiling instead of babel-register, for performance
  //initController: __dirname + '/init.js',
  logLevel: process.env.LOG_LEVEL ? Number(process.env.LOG_LEVEL ) : 3,
  authKey: process.env.AUTH_KEY,
  origins: process.env.ORIGINS || '*:*',
})