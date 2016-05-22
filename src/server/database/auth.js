import { createUser, getUser } from './user'

export const authenticate = (credentials, redis) =>
  redis.hget('emails', credentials.email).then(userId => {

    if (!userId) {
      return createUser(credentials, redis)
    }

    return getUser(userId, redis).then(userData => ({
      id: userId,
      username: userData.username,
      email: userData.email,
      privateChannel: `user:${userId}`
    }))
  })
