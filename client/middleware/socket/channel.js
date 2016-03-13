import { 
  LOGIN_SUCCESS,
  SUBSCRIBE_SERVICE_REQUEST,
  SUBSCRIBE_SERVICE_SUCCESS,
  SUBSCRIBE_SERVICE_FAILURE,
  SUBSCRIBE_PRIVATE_REQUEST,
  SUBSCRIBE_PRIVATE_SUCCESS,
  SUBSCRIBE_PRIVATE_FAILURE,
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
  socket.on('subscribe', (...args) => {
    console.warn('subscribe', ...args);
  })
  socket.on('subscribeFail', (...args) => {
    console.warn('subscribeFail', ...args);
  })
  socket.on('unsubscribe', (...args) => {
    console.warn('unsubscribe', ...args);
  })
  socket.on('subscribeStateChange', (...args) => {
    console.warn('subscribeStateChange', ...args);
  })
  socket.on('subscribeRequest', channel => {
    
    console.warn('subscribeRequest', channel);
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
  console.warn('maybeJoinChannel', action)
  
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
  
  return false
}