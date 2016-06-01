import { channel } from 'redux-saga'
import { take, fork, call, put } from 'redux-saga/effects'

import { socket } from '../services'

// @TODO turn this into a saga that can deal with timeouts and network issues
export function emit(action) {
  return new Promise((resolve, reject) =>
    socket.emit('dispatch', action, (err, data) => {
      console.log('socket is dispatching', action)
      if (err || !data) {
        console.log('socket error', err || {})
        return reject(err || {})
      }
      console.log('socket success', data)
      return resolve(data)
    })
)
}

export function *handleEmit(action, successType, failureType) {
  console.log('handleEmit', action, successType, failureType)
  try {
    const payload = yield call(emit, action)
    console.log('payload', payload)
    yield put({ type: successType, payload })
    return payload
  } catch (error) {
    yield put({ type: failureType, error })
  }
}


export function* watchSocket() {
  // create a channel to queue incoming requests
  const chan = yield call(channel)

  // create 3 worker 'threads'
  for (let i = 0; i < 3; i++) {
    yield fork(handleRequest, chan)
  }

  while (true) { // eslint-disable-line
    const { payload } = yield take('REQUEST')
    yield put(chan, payload)
  }
}

function* handleRequest(chan) {
  while (true) { // eslint-disable-line
    const payload = yield take(chan)
    // process the request
  }
}
