import * as types from '../../../src/shared/constants/ActionTypes'

import expect from 'expect'

import { authenticate } from '../../../src/server/sagas/auth'

describe('server/sagas/auth', () => {
  it('authenticate', () => {
    const iterator = authenticate()
  })
})
