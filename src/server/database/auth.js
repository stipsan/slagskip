// @TODO https://github.com/yarnpkg/yarn/issues/2266
//import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'
import invariant from 'invariant'

import { getUser } from './user'

export const authenticate = (credentials, redis) =>
  redis.hget('emails', credentials.email).then(userId => {
    invariant(userId, 'User does not exist')

    return getUser(userId, redis).then(userData => {
      invariant(
        bcrypt.compareSync(credentials.password, userData.password), 'Entered wrong password!'
      )
      return ({
        id: userId,
        username: userData.username,
        email: userData.email,
        privateChannel: `user:${userId}`
      })
    }
    )
  })

export const checkEmailExist = (email, redis) => redis.hexists('emails', email)
