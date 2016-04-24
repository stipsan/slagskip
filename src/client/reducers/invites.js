import {
  AUTHENTICATE_SUCCESS,
  RECEIVE_GAME_INVITE,
  RECEIVE_GAME_INVITE_ACCEPTED,
  DECLINE_GAME_INVITE_SUCCESS,
  CANCEL_GAME_INVITE_SUCCESS,
} from '../constants/ActionTypes'
import { Set as ImmutableSet } from 'immutable'

const initialState = ImmutableSet()

export const invites = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return state.intersect(action.invites)
    case RECEIVE_GAME_INVITE:
    case RECEIVE_GAME_INVITE_ACCEPTED:
      return state.add(action.username)
    case DECLINE_GAME_INVITE_SUCCESS:
    case CANCEL_GAME_INVITE_SUCCESS:
      return state.subtract(action.username)
    default:
      return state
  }
}
