import invariant from 'invariant'
import { createUser } from './user'

export const authenticate = (credentials, redis) => {
  return redis.hget('users', credentials.username).then(userId => {

    // invariant(userId > 0, `No user with that username!`)
    if (!userId) {
      return createUser(credentials, redis)
    }

    return {
      id: userId,
      username: credentials.username,
      privateChannel: `user:${userId}`
    }
  })
}
