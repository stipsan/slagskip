import expect from 'expect'
import { capabilities as reducer } from '../../../src/client/reducers/index'
import * as types from '../../../src/client/constants/ActionTypes'

describe('capabilities reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        websocket: true
      }
    )
  })
})