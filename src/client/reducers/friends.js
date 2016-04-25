import { Map as ImmutableMap, OrderedMap as ImmutableOrderedMap } from 'immutable'

import {
  RECEIVE_VIEWER,
  FRIENDS_SUCCESS,
  RECEIVE_FRIEND_NETWORK_STATUS,
  GAME_INVITE_SUCCESS,
  RECEIVE_GAME_INVITE,
  RECEIVE_GAME_INVITE_ACCEPTED,
  CANCEL_GAME_INVITE_SUCCESS,
  RECEIVE_GAME_INVITE_DECLINED,
  DECLINE_GAME_INVITE_SUCCESS,
  RECEIVE_GAME_INVITE_CANCELLED,
  ACCEPT_GAME_INVITE_SUCCESS,
} from '../constants/ActionTypes'

const defaultFriend = ImmutableMap({
  online: '0',
  lastVisit: '',
  inviteIn: false,
  inviteOut: false
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
    if (state.hasIn(['list', action.id])) {
      return state.mergeIn(['list', action.id], {
        id: action.id,
        online: action.online,
        lastVisit: action.lastVisit
      })
    } else {
      return state.set('total', state.get('total') + 1)
    }

  case DECLINE_GAME_INVITE_SUCCESS:
  case RECEIVE_GAME_INVITE_ACCEPTED:
  case RECEIVE_GAME_INVITE_CANCELLED:
  case RECEIVE_GAME_INVITE:
    return state.mergeIn(['list', action.id], {
      id: action.id,
      inviteIn: action.inviteIn,
    })
  case RECEIVE_GAME_INVITE_DECLINED:
  case CANCEL_GAME_INVITE_SUCCESS:
  case ACCEPT_GAME_INVITE_SUCCESS:
  case GAME_INVITE_SUCCESS:
    return state.mergeIn(['list', action.id], {
      id: action.id,
      inviteOut: action.inviteOut,
    })
  default:
    return state
  }
}
