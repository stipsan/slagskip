import * as TYPE from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

export const invites = (state = new Set([]), action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return new Set(action.invites)
  case TYPE.RECEIVE_GAME_INVITE:
  case TYPE.RECEIVE_GAME_INVITE_ACCEPTED:
    return new Set([
      ...state,
      action.username,
    ])
  case TYPE.DECLINE_GAME_INVITE_SUCCESS:
  case TYPE.CANCEL_GAME_INVITE_SUCCESS:
    var nextState = new Set([...state])
    nextState.delete(action.username)
    return nextState
  default:
    return state
  }
}
