import invariant from 'invariant'
import { authenticate } from './auth'

export const createUser = (userData, redis) => {
  invariant(userData.username, 'Invalid userData, missing `username` property')
  
  //const usernameKey = userData.username.toLowerCase()
  return redis.hget('users', userData.username)
    .then(usernameTaken => {
      
      invariant(!usernameTaken, `Username not available`)
      
      return redis.incr('user_next')
    })
    .then(userId => {
      return redis.multi([
        ['hsetnx', 'users', userData.username, userId],
        ['hsetnx', `user:${userId}`, 'id', userId],
        ['hsetnx', `user:${userId}`, 'username', userData.username],
      ]).exec()
    })
    .then(results => {
      const didUpdateUsersList = results[0][1]
      const didSetUserId       = results[1][1]
      const didSetUsername     = results[2][1]
      invariant(didUpdateUsersList && didSetUserId && didSetUsername, `Failed to create user`)
      
      return authenticate(userData, redis)
    })
}