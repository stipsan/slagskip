// @TODO turn this into a saga that can deal with timeouts and network issues
export const emit = (socket, type, payload) => new Promise((resolve, reject) =>
  socket.emit('dispatch', { type, ...payload }, (err, data) => {
    if (err) {
      return reject(err)
    }
    return resolve(data)
  })
)
