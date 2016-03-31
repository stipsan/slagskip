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
        id: null,
        isLoaded: false,
        username: '',
      }
    )
  })
  it('should handle AUTHENTICATE_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.AUTHENTICATE_SUCCESS,
        authToken: {
          id: "2",
          username: 'Foo'
        }
      }).toJS()
    ).toEqual(
      {
        username: 'Foo',
        isLoaded: false,
        id: "2"
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
      }
    )
  })
})