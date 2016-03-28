import invariant from 'invariant'

export const authenticate = (credentials, redis) => {
  return redis.hget('users', credentials.username).then(userId => {
    
    invariant(userId > 0, `No user with that username!`)
    
    return {
      id: userId,
      username: credentials.username,
      privateChannel: `user:${userId}`
    }
  })
}