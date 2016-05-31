import { socket } from '../services'

// @TODO turn this into a saga that can deal with timeouts and network issues
console.log('nada?')
export const emit = (type, payload) => new Promise((resolve, reject) =>
  socket.emit('dispatch', { type, ...payload }, (err, data) => {
    console.log('emit dispatch', type)
    if (err) {
      return reject(err)
    }
    return resolve(data)
  })
)
