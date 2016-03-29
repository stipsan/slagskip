import express from 'express'
import compressionMiddleware from 'compression'
import originsMiddleware from './middleware/origins'
import htmlMiddleware from './middleware/html'
import { createConnection } from '../database'
import { createSocketServer, applySocketMiddleware } from './socket'

export const run = worker => {
  const app   = express()
  const redis = createConnection(process.env.REDIS_URL || '127.0.0.1:6379')
  
  
  // Security reasons, this should be the default in express
  app.set('x-powered-by', false)
  // We are on Heroku after all, behind load balancers 
  // and want our https and wss to work properly with the IPs
  app.enable('trust proxy')
  
  app.use(compressionMiddleware())
  app.use(originsMiddleware())
  /*
  if(process.env.NODE_ENV !== 'production') {
    const config   = require('../../webpack.config');
    const compiler = require('webpack')(config);
    app.use(require('webpack-dev-middleware')(compiler, config.devServer));
    //@TODO the socket.io that the middleware uses breaks on SocketCluster
    app.use(require('webpack-hot-middleware')(compiler));
  }
  //*/
  app.use(express.static('public', { maxAge: 86400000 * 365, index: false }))
  app.use(htmlMiddleware())
  
  worker.httpServer.on('request', app)
  
  createSocketServer(applySocketMiddleware(worker.scServer), redis)
}