import expect from 'expect'
import { disconnected as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

describe('disconnected reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(false)
  })
  it('should handle SOCKET_SUCCESS', () => {
    expect(
      reducer(true, { type: types.SOCKET_SUCCESS })
    ).toEqual(false)
  })
  it('should handle SOCKET_FAILURE', () => {
    expect(
      reducer(undefined, { type: types.SOCKET_FAILURE })
    ).toEqual(true)
  })
})