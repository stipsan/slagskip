import { CALL_SOCKET } from '../middleware/socket'
import {
  GAME_INVITE_REQUEST,
  GAME_INVITE_SUCCESS,
  GAME_INVITE_FAILURE,
  ACCEPT_GAME_INVITE_REQUEST,
  ACCEPT_GAME_INVITE_SUCCESS,
  ACCEPT_GAME_INVITE_FAILURE,
  DECLINE_GAME_INVITE_REQUEST,
  DECLINE_GAME_INVITE_SUCCESS,
  DECLINE_GAME_INVITE_FAILURE,
  CANCEL_GAME_INVITE_REQUEST,
  CANCEL_GAME_INVITE_SUCCESS,
  CANCEL_GAME_INVITE_FAILURE,
} from '../constants/ActionTypes'

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function gameInvite(friend) {
  console.info('gameInvite', friend);
  return {
    [CALL_SOCKET]: {
      types: [ GAME_INVITE_REQUEST, GAME_INVITE_SUCCESS, GAME_INVITE_FAILURE ],
      data: friend
    }
  }
}

export function acceptGameInvite(friend) {
  console.info('acceptGameInvite', friend);
  return {
    [CALL_SOCKET]: {
      types: [ ACCEPT_GAME_INVITE_REQUEST, ACCEPT_GAME_INVITE_SUCCESS, ACCEPT_GAME_INVITE_FAILURE ],
      data: friend
    }
  }
}
export function declineGameInvite(friend) {
  console.info('declineGameInvite', friend);
  return {
    [CALL_SOCKET]: {
      types: [ DECLINE_GAME_INVITE_REQUEST, DECLINE_GAME_INVITE_SUCCESS, DECLINE_GAME_INVITE_FAILURE ],
      data: friend
    }
  }
}
export function cancelGameInvite(friend) {
  console.info('cancelGameInvite', friend);
  return {
    [CALL_SOCKET]: {
      types: [ CANCEL_GAME_INVITE_REQUEST, CANCEL_GAME_INVITE_SUCCESS, CANCEL_GAME_INVITE_FAILURE ],
      data: friend
    }
  }
}