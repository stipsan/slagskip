import { eventChannel } from 'redux-saga'
import { take, put, call, cps, fork } from 'redux-saga/effects'

export function *emitEvent(socket, action) {
  yield cps([socket, socket.emit], 'dispatch', action)
}

// @TODO refactor to worker that automatically retry until the client pings back in emitEvent
export function *handleEmit(socket, action) {
  console.log('after start submit')
  yield fork(emitEvent, socket, action)
  console.log('socket emit')
}

export function handleSocketEventChannel(event, socket) {
  console.log('socket is listening to:', event)
  return eventChannel(listener => {
    const handleClientRequest = (action, cb) => {
      // notify the client that the request is received
      cb() // eslint-disable-line
      console.log('handleSocketEvent:', event, action)
      listener(action)
    }
    socket.on(event, handleClientRequest)
    return () => {
      console.log('socket stopped listening to:', event)
      socket.off(event, handleClientRequest)
    }
  })
}

export function *watchClientRequests(socket, database, redis) {
  const chan = yield call(handleSocketEventChannel, 'dispatch', socket)
  try {
    while (true) { // eslint-disable-line
      const action = yield take(chan)
      console.log('watchClientRequests:', action)
      yield put(action)
    }
  } finally {
    console.log('watchClientRequests terminated')
  }
}
