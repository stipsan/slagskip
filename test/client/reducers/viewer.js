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
})