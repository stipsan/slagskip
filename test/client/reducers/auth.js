import expect from 'expect'
import { auth as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        authState: 'unauthenticated',
        authToken: null,
        isAuthenticated: false
      }
    )
  })
})