import { createUser, getUser } from './user'

export const authenticate = (credentials, redis) =>
  redis.hget('emails', credentials.email).then(userId => {

    if (!userId) {
      return createUser(credentials, redis)
    }

    return getUser(userId).then(userData => {
      console.log(userData)
    })

    return {
      id: userId,
      username: credentials.username,
      privateChannel: `user:${userId}`
    }
  })
