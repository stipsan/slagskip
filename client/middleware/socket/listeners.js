/*eslint no-console: 1 */
import { 
  SOCKET_FAILURE,
  SUBSCRIBE_CHANNEL_REQUEST,
  SUBSCRIBE_CHANNEL_SUCCESS,
  SUBSCRIBE_CHANNEL_FAILURE,
  LOGOUT_SUCCESS,
} from '../../constants/ActionTypes'

let shouldAttachListeners = true
export const attachListeners = (store, next, action, socket) => {
  if(!shouldAttachListeners) {
    return false
  }
  
  // @TODO purely for debugging
  socket.on('message', (...args) => console.info('message', args))

  // connect.js
  socket.on('disconnect', () => {
    console.info('disconnect')
  })
  socket.on('error', data => {
    next({ type: SOCKET_FAILURE, event: 'error', ...data, socket })
  })
  socket.on('connectAbort', () => {
    next({ type: SOCKET_FAILURE, event: 'connectAbort', socket })
  })
  
  // authenticate.js
  socket.on('authenticate', (...args) => {
    console.info('authenticate', ...args)
  })
  socket.on('deauthenticate', (...args) => {
    console.info('deauthenticate', ...args)
  })
  socket.on('authStateChange', data => {
    if(data.newState === 'unauthenticated') next({ type: LOGOUT_SUCCESS, socket })
    console.info('authStateChange', data)
  })
  
  // channel.js
  socket.on('kickOut', (...args) => {
    console.info('kickOut', ...args)
  })
  socket.on('subscribe', channel => {
    next({ ...action, type: SUBSCRIBE_CHANNEL_SUCCESS, channel, socket })
  })
  socket.on('subscribeFail', (err, channel) => {
    next({ ...action, type: SUBSCRIBE_CHANNEL_FAILURE, channel, socket })
  })
  socket.on('unsubscribe', (...args) => {
    console.info('unsubscribe', ...args)
  })
  socket.on('subscribeStateChange', (...args) => {
    console.info('subscribeStateChange', ...args)
  })
  socket.on('subscribeRequest', channel => {
    next({ ...action,  type: SUBSCRIBE_CHANNEL_REQUEST, channel, socket })
  })
}

export const didAttachListeners = () => !shouldAttachListeners

// @TODO
export const removeAttachedListeners = () => {}