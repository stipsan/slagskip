import expect from 'expect'
import { connected as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

describe('connected reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(false)
  })
  it('should handle SOCKET_SUCCESS', () => {
    expect(
      reducer(undefined, { type: types.SOCKET_SUCCESS })
    ).toEqual(true)
  })
})