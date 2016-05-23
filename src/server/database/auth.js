import invariant from 'invariant'

import { getUser } from './user'

export const authenticate = (credentials, redis) =>
  redis.hget('emails', credentials.email).then(userId => {
    invariant(userId, 'User does not exist')

    return getUser(userId, redis).then(userData => ({
      id: userId,
      username: userData.username,
      email: userData.email,
      privateChannel: `user:${userId}`
    }))
  })
