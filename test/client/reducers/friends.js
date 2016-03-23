import expect from 'expect'
import { friends as reducer } from '../../../client/reducers/index'
import * as types from '../../../client/constants/ActionTypes'

describe('friends reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        total: 0,
        list: {},
      }
    )
  })
  
  it('updates friends count before loading friends data', () => {
    expect(
      reducer(undefined, {
        type: types.RECEIVE_VIEWER,
        friendIds: [2, 3]
      }).toJS()
    ).toEqual(
      {
        total: 2,
        list: {},
      }
    )
  })
  
  it('should update state on FRIENDS_SUCCESS', () => {
    const lastVisit = new Date().toJSON()
    expect(
      reducer(undefined, {
        type: types.FRIENDS_SUCCESS,
        friends: [
          {id: 2, username: 'batman', online: '1', inviteOut: '1'},
          {id: 3, username: 'spiderman', inviteIn: '1', lastVisit}
        ]
      }).toJS()
    ).toEqual(
      {
        total: 2,
        list: {
          2: {id: 2, username: 'batman', online: '1', inviteIn: '0', inviteOut: '1', lastVisit: ''},
          3: {id: 3, username: 'spiderman', online: '0', inviteIn: '1', inviteOut: '0', lastVisit}
        },
      }
    )
  })
  
  it('should not fail if viewer got no friends', () => {
    expect(
      reducer(undefined, {
        type: types.FRIENDS_SUCCESS,
        friends: []
      }).toJS()
    ).toEqual(
      {
        total: 0,
        list: {},
      }
    )
  })
  
  it('should update status of friends that come online', () => {
    const lastVisit = '2016-03-23T15:33:41.972Z'
    const newVisit = new Date().toJSON()
    const initialState = reducer(undefined, {
      type: types.FRIENDS_SUCCESS,
      friends: [
        {id: 2, username: 'batman', online: '1'},
        {id: 3, username: 'spiderman', online: '0', lastVisit}
      ]
    })
    expect(
      reducer(initialState, {
        type: types.RECEIVE_FRIEND_NETWORK_STATUS,
        id: 3,
        online: '1',
        lastVisit: newVisit
      }).toJS()
    ).toEqual(
      {
        total: 2,
        list: {
          2: {id: 2, username: 'batman', online: '1', inviteIn: '0', inviteOut: '0', lastVisit: ''},
          3: {id: 3, username: 'spiderman', online: '1', inviteIn: '0', inviteOut: '0', lastVisit: newVisit}
        },
      }
    )
    expect(
      reducer(initialState, {
        type: types.RECEIVE_FRIEND_NETWORK_STATUS,
        id: 2,
        online: '0',
        lastVisit: newVisit
      }).toJS()
    ).toEqual(
      {
        total: 2,
        list: {
          2: {id: 2, username: 'batman', online: '0', inviteIn: '0', inviteOut: '0', lastVisit: newVisit},
          3: {id: 3, username: 'spiderman', online: '0', inviteIn: '0', inviteOut: '0', lastVisit}
        },
      }
    )
  })


})