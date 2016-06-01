import * as types from '../../../src/client/constants/ActionTypes'

import expect from 'expect'

import { auth as reducer } from '../../../src/client/reducers/index'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        authState: 'unauthenticated',
        authToken: null,
        doesEmailExist: null,
        isAuthenticated: false
      }
    )
  })
})
