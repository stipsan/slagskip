import {
  AUTHENTICATE_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  matchState: ,
  list: 
})

export const match = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_VIEWER:
    return state.set('total', action.friendIds.length)
  case FRIENDS_SUCCESS:
    return action.friends.reduce(
      (state, friend) => state.setIn(['list', friend.id], defaultFriend.merge(friend)),
      state.set('total', action.friends.length)
    )
  case RECEIVE_FRIEND:
    return state.setIn(['list', action.username], defaultFriend.merge({
      username: action.username,
      online: action.online,
    }))
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