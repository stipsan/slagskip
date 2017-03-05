// @TODO https://github.com/yarnpkg/yarn/issues/2266
//import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'
import invariant from 'invariant'

import { authenticate } from './auth'

export const createUser = (userData, redis) => {
  console.log(userData)
  invariant(userData.username, 'Invalid userData, missing `username` property')
  invariant(userData.email, 'Invalid userData, missing `email` property')
  invariant(userData.password, 'Invalid userData, missing `password` property')

  // const usernameKey = userData.username.toLowerCase()
  return redis.hget('emails', userData.email)
    .then(emailTaken => {

      invariant(!emailTaken, 'Already registered with that email!')

      return redis.incr('user_next')
    })
    .then(userId =>
      redis.multi([
        ['hsetnx', 'emails', userData.email, userId],
        ['hsetnx', `user:${userId}`, 'id', userId],
        ['hsetnx', `user:${userId}`, 'username', userData.username],
        ['hsetnx', `user:${userId}`, 'email', userData.email],
        ['hsetnx', `user:${userId}`, 'password', bcrypt.hashSync(userData.password, 10)]
      ]).exec()
    )
    .then(results => {
      const didUpdateUsersList = results[0][1]
      const didSetUserId = results[1][1]
      const didSetUsername = results[2][1]
      invariant(didUpdateUsersList && didSetUserId && didSetUsername, 'Failed to create user')

      return authenticate(userData, redis)
    })
}

export const getUser = (userId, redis) => {
  invariant(userId, 'Missing userId')

  return redis.hgetall(`user:${userId}`)
    .then(userData => {
      invariant(userData, 'userData not available')

      return userData
    })
}
