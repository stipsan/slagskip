import { createUser } from './user'

export const authenticate = (credentials, redis) =>
  redis.hget('users', credentials.username).then(userId => {

    if (!userId) {
      return createUser(credentials, redis)
    }

    return {
      id: userId,
      username: credentials.username,
      privateChannel: `user:${userId}`
    }
  })
