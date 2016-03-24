import expect from 'expect'
import { capabilities as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

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