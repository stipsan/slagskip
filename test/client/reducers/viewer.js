import expect from 'expect'
import { viewer as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

describe('viewer reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        username: '',
        loggedIn: false,
      }
    )
  })
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_SUCCESS,
        username: 'Foo'
      })
    ).toEqual(
      {
        username: 'Foo',
        loggedIn: true,
      }
    )
  })
  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer({}, { type: types.LOGOUT_SUCCESS})
    ).toEqual(
      {
        username: '',
        loggedIn: false,
      }
    )
  })
})