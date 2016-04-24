
export const subscribeChannels = (store, next, action, socket, channels = ['service']) =>
  channels.map(channel => {
    if (!socket.isSubscribed(channel, true)) {
      const subscribedTo = socket.subscribe(channel, { waitForAuth: true })
      subscribedTo.watch(action => next(action))

      return subscribedTo
    }
  })
