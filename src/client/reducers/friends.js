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

export const friends = (state = initialState, { type, payload }) => {
  switch (type) {
  case RECEIVE_VIEWER:
    return state.set('total', payload.friendIds.length)
  case FRIENDS_SUCCESS:
    return payload.friends.reduce(
      (newState, friend) => newState.setIn(['list', friend.id], defaultFriend.merge(friend)),
      state.set('total', payload.friends.length)
    )
  case RECEIVE_FRIEND_NETWORK_STATUS:
    if (state.hasIn(['list', payload.id])) {
      return state.mergeIn(['list', payload.id], {
        id: payload.id,
        online: payload.online,
        lastVisit: payload.lastVisit
      })
    }
    return state.set('total', state.get('total') + 1)
  case DECLINE_GAME_INVITE_SUCCESS:
  case RECEIVE_GAME_INVITE_ACCEPTED:
  case RECEIVE_GAME_INVITE_CANCELLED:
  case RECEIVE_GAME_INVITE:
    return state.mergeIn(['list', payload.id], {
      id: payload.id,
      inviteIn: payload.inviteIn,
    })
  case RECEIVE_GAME_INVITE_DECLINED:
  case CANCEL_GAME_INVITE_SUCCESS:
  case ACCEPT_GAME_INVITE_SUCCESS:
  case GAME_INVITE_SUCCESS:
    return state.mergeIn(['list', payload.id], {
      id: payload.id,
      inviteOut: payload.inviteOut,
    })
  default:
    return state
  }
}
