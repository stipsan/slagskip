import { 
  LOGIN_SUCCESS,
  SUBSCRIBE_SERVICE_REQUEST,
  SUBSCRIBE_SERVICE_SUCCESS,
  SUBSCRIBE_SERVICE_FAILURE,
  SUBSCRIBE_PRIVATE_REQUEST,
  SUBSCRIBE_PRIVATE_SUCCESS,
  SUBSCRIBE_PRIVATE_FAILURE,
  LOGOUT_SUCCESS,
} from '../../constants/ActionTypes'

const SERVICE_CHANNEL = 'service'
let   PRIVATE_CHANNEL

let shouldAttachListeners = true
const attachListeners = (store, next, action, socket) => {
  if(!shouldAttachListeners) {
    return false
  }

  socket.on('kickOut', (...args) => {
    console.warn('kickOut', ...args);
  })
  socket.on('subscribe', channel => {
    switch (channel) {
      case SERVICE_CHANNEL:
        return next({ type: SUBSCRIBE_SERVICE_SUCCESS, channel })
      case PRIVATE_CHANNEL:
        return next({ type: SUBSCRIBE_PRIVATE_SUCCESS, channel })
    }
  })
  socket.on('subscribeFail', (err, channel) => {
    switch (channel) {
      case SERVICE_CHANNEL:
        return next({ type: SUBSCRIBE_SERVICE_FAILURE, channel })
      case PRIVATE_CHANNEL:
        return next({ type: SUBSCRIBE_PRIVATE_FAILURE, channel })
    }
  })
  socket.on('unsubscribe', (...args) => {
    console.warn('unsubscribe', ...args);
  })
  socket.on('subscribeStateChange', (...args) => {
    console.warn('subscribeStateChange', ...args);
  })
  socket.on('subscribeRequest', channel => {    
    switch (channel) {
      case SERVICE_CHANNEL:
        return next({ type: SUBSCRIBE_SERVICE_REQUEST, channel })
      case PRIVATE_CHANNEL:
        return next({ type: SUBSCRIBE_PRIVATE_REQUEST, channel })
    }
  })
}

const subscribeService = (store, next, action, socket) => {
  // intended for global redux actions that announce server maintenance, etc
  // @TODO safeguard what can be passed in the public channel
  // @TODO responding to 'friends' events, a friend coming online etc will be moved
  //       to the private userChannel later
  // @TODO everyone can listen to this socket, but only server can publish to it
  const serviceChannel = socket.subscribe(SERVICE_CHANNEL);
  serviceChannel.watch(action => next(action))
}

const subscribeUser = (store, next, action, socket) => {
  const id          = action.id
  PRIVATE_CHANNEL   = `user:${id}`
  const userChannel = socket.subscribe(PRIVATE_CHANNEL)
  // This acts essentially like a proxy for the server to dispatch redux actions
  // on the client directly
  // @TODO add server middleware to keep this channel private, for security
  //       or else anyone can trigger anything in other user sessions
  userChannel.watch(action => next(action))
}

const batch = (callbacks, args) => callbacks.forEach(callback => callback(...args))

export const maybeJoinChannel = (store, next, action, socket) => {  
  switch (action.type) {
    case LOGIN_SUCCESS:
      return batch(
        [attachListeners, subscribeService, subscribeUser],
        [store, next, action, socket],
      )
  }
}

export const willLeaveChannel = (store, next, action, socket) => {
  console.warn('shouldLeaveChannel?', action)
  
  switch (action.type) {
    case LOGOUT_SUCCESS:
      //@TODO implement this
      //return true
  }
  
  return false
}