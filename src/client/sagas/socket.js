import { socket } from '../services'

export const emit = (type, payload) => new Promise((resolve, reject) =>
  socket.emit('dispatch', { type, ...payload }, (err, data) => {
    if (err) {
      return reject(err)
    }
    return resolve(data)
  })
)
