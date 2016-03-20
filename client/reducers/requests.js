import * as TYPE from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

export const requests = (state = new Set([]), action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return new Set(action.requests)
  case TYPE.GAME_INVITE_SUCCESS:
  case TYPE.ACCEPT_GAME_INVITE_SUCCESS:
    return new Set([
      ...state,
      action.username,
    ])
  case TYPE.RECEIVE_GAME_INVITE_DECLINED:
  case TYPE.CANCEL_GAME_INVITE_SUCCESS:
    var nextState = new Set([...state])
    nextState.delete(action.username)
    return nextState
  default:
    return state
  }
}