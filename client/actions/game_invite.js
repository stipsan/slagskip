import { CALL_SOCKET } from '../middleware/socket'
import {
  GAME_INVITE_REQUEST,
  GAME_INVITE_SUCCESS,
  GAME_INVITE_FAILURE,
} from '../constants/ActionTypes'

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function gameInvite(friend) {
  console.log('gameInvite', friend);
  return {
    [CALL_SOCKET]: {
      types: [ GAME_INVITE_REQUEST, GAME_INVITE_SUCCESS, GAME_INVITE_FAILURE ],
      data: friend
    }
  }
}