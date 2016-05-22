import * as types from '../../../src/client/constants/ActionTypes'

import expect from 'expect'
import { fromJS } from 'immutable'

import { viewer as reducer } from '../../../src/client/reducers/index'

describe('viewer reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        id: null,
        isLoaded: false,
        username: '',
        email: '',
      }
    )
  })
  it('should handle AUTHENTICATE_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.AUTHENTICATE_SUCCESS,
        authToken: {
          id: '2',
          username: 'Foo',
          email: 'foo@bar.org',
        }
      }).toJS()
    ).toEqual(
      {
        username: 'Foo',
        isLoaded: false,
        id: '2',
        email: 'foo@bar.org',
      }
    )
  })
  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer(undefined, { type: types.LOGOUT_SUCCESS }).toJS()
    ).toEqual(
      {
        username: '',
        id: null,
        isLoaded: false,
        email: '',
      }
    )
  })
})
