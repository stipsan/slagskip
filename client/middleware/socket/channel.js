import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SUBSCRIBE_CHANNEL_REQUEST,
} from '../../constants/ActionTypes'

const SERVICE_CHANNEL = 'service'
let   PRIVATE_CHANNEL


/*
const subscribeService = (store, next, action, socket) => {
  // intended for global redux actions that announce server maintenance, etc
  // @TODO safeguard what can be passed in the public channel
  // @TODO responding to 'friends' events, a friend coming online etc will be moved
  //       to the private userChannel later
  // @TODO everyone can listen to this socket, but only server can publish to it
  const serviceChannel = socket.subscribe(SERVICE_CHANNEL);
  serviceChannel.watch(action => next({ ...action, authToken: socket.authToken }))
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
//*/
export const subscribeChannels = (store, next, action, socket, channels = ['service']) =>
  channels.map(channel => {
    if(!socket.isSubscribed(channel, true)) {
      const subscribedTo = socket.subscribe(channel, {waitForAuth: true})
      subscribedTo.watch(action => next(action))
      
      return subscribedTo
    }
  })
  

const batch = (callbacks, args) => callbacks.forEach(callback => callback(...args))

export const maybeJoinChannel = (store, next, action, socket) => {  
  console.warn('maybeJoinChannel', action, socket);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return batch(
        [attachListeners, subscribeChannels],
        [store, next, action, socket],
      )
  }
}