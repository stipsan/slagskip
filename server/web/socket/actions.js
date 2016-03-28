import {
  AUTHENTICATE_REQUEST,
  DEAUTHENTICATE_REQUEST,
  FRIENDS_REQUEST,
  GAME_INVITE_REQUEST,
  ACCEPT_GAME_INVITE_REQUEST,
  DECLINE_GAME_INVITE_REQUEST,
  CANCEL_GAME_INVITE_REQUEST,
} from '../../constants/ActionTypes'
import {
  authenticateRequest,
  deauthenticateRequest,
  friendsRequest,
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
} from '../../actions'

// @TODO perhaps this belongs in a custom middleware
export const actions = {
  [AUTHENTICATE_REQUEST]: authenticateRequest,
  [DEAUTHENTICATE_REQUEST]: deauthenticateRequest,
  [FRIENDS_REQUEST]: friendsRequest,
  [GAME_INVITE_REQUEST]: gameInvite,
  [ACCEPT_GAME_INVITE_REQUEST]: acceptGameInvite,
  [DECLINE_GAME_INVITE_REQUEST]: declineGameInvite,
  [CANCEL_GAME_INVITE_REQUEST]: cancelGameInvite,
}