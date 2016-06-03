import * as database from '../../database'

import createStore from '../../store'

export const createSocketServer = (scServer, redis) => {
  scServer.on('connection', socket => createStore(socket, database, redis))
}
