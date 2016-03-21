import expect from 'expect'
import { fromJS } from 'immutable'
import { viewer as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

describe('viewer reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        username: '',
        isAuthenticated: false,
      }
    )
  })
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_SUCCESS,
        username: 'Foo'
      }).toJS()
    ).toEqual(
      {
        username: 'Foo',
        isAuthenticated: true,
      }
    )
  })
  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer(undefined, { type: types.LOGOUT_SUCCESS }).toJS()
    ).toEqual(
      {
        username: '',
        isAuthenticated: false
      }
    )
  })
})