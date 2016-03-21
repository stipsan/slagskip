import {
  LOGIN_SUCCESS,
  RECEIVE_FRIEND,
  RECEIVE_FRIEND_NETWORK_STATUS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap, OrderedMap as ImmutableOrderedMap } from 'immutable'


const defaultFriend = ImmutableMap({
  online: false,
  lastVisit: null,
})
const initialState = ImmutableOrderedMap()

const mapFriendToState = friend => defaultFriend.merge(friend)

export const friends = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return action.friends.reduce(
      (state, friend) => state.set(friend.username, defaultFriend.merge(friend)),
      state
    )
  case RECEIVE_FRIEND:
    return state.set(action.username, defaultFriend.merge({
      username: action.username,
      online: action.online,
    }))
  case RECEIVE_FRIEND_NETWORK_STATUS:
    return state.mergeIn([action.username], {
      username: action.username,
      online: action.online,
      lastVisit: action.lastVisit
    })
  default:
    return state
  }
}