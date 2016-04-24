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

export function gameInvite(friend) {
  return {
    [CALL_SOCKET]: {
      types: [GAME_INVITE_REQUEST, GAME_INVITE_SUCCESS, GAME_INVITE_FAILURE],
      data: friend,
    },
  }
}

export function acceptGameInvite(friend) {
  return {
    [CALL_SOCKET]: {
      types: [ACCEPT_GAME_INVITE_REQUEST, ACCEPT_GAME_INVITE_SUCCESS, ACCEPT_GAME_INVITE_FAILURE],
      data: friend,
    },
  }
}
export function declineGameInvite(friend) {
  return {
    [CALL_SOCKET]: {
      types: [DECLINE_GAME_INVITE_REQUEST, DECLINE_GAME_INVITE_SUCCESS, DECLINE_GAME_INVITE_FAILURE],
      data: friend,
    },
  }
}
export function cancelGameInvite(friend) {
  return {
    [CALL_SOCKET]: {
      types: [CANCEL_GAME_INVITE_REQUEST, CANCEL_GAME_INVITE_SUCCESS, CANCEL_GAME_INVITE_FAILURE],
      data: friend,
    },
  }
}
