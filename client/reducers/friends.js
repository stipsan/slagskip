import {
  RECEIVE_VIEWER,
  FRIENDS_SUCCESS,
  RECEIVE_FRIEND_NETWORK_STATUS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap, OrderedMap as ImmutableOrderedMap } from 'immutable'


const defaultFriend = ImmutableMap({
  online: '0',
  lastVisit: '',
  inviteIn: '0',
  inviteOut: '0'
})
const initialState = ImmutableMap({
  total: 0,
  list: ImmutableOrderedMap({})
})

const mapFriendToState = friend => defaultFriend.merge(friend)

export const friends = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_VIEWER:
    return state.set('total', action.friendIds.length)
  case FRIENDS_SUCCESS:
    return action.friends.reduce(
      (state, friend) => state.setIn(['list', friend.id], defaultFriend.merge(friend)),
      state.set('total', action.friends.length)
    )
  case RECEIVE_FRIEND_NETWORK_STATUS:
    return state.mergeIn(['list', action.id], {
      id: action.id,
      online: action.online,
      lastVisit: action.lastVisit
    })
  default:
    return state
  }
}