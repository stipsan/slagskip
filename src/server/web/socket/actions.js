import {
  deauthenticateRequest,
  friendsRequest,
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
  broadcastNetworkStatus,
  loadGame,
  fireCannon,
  newGame,
  gamesRequest,
  joinGame,
} from '../../actions'
import {
  DEAUTHENTICATE_REQUESTED,
  FRIENDS_REQUESTED,
  GAME_INVITE_REQUESTED,
  ACCEPT_GAME_INVITE_REQUESTED,
  DECLINE_GAME_INVITE_REQUESTED,
  CANCEL_GAME_INVITE_REQUESTED,
  RECEIVE_FRIEND_NETWORK_STATUS,
  LOAD_GAME_REQUESTED,
  FIRE_CANNON_REQUESTED,
  NEW_GAME_REQUESTED,
  GAMES_REQUESTED,
  JOIN_GAME_REQUESTED,
} from '../../constants/ActionTypes'

// @TODO perhaps this belongs in a custom middleware
export const actions = {
  [DEAUTHENTICATE_REQUESTED]: deauthenticateRequest,
  [FRIENDS_REQUESTED]: friendsRequest,
  [GAME_INVITE_REQUESTED]: gameInvite,
  [ACCEPT_GAME_INVITE_REQUESTED]: acceptGameInvite,
  [DECLINE_GAME_INVITE_REQUESTED]: declineGameInvite,
  [CANCEL_GAME_INVITE_REQUESTED]: cancelGameInvite,
  [RECEIVE_FRIEND_NETWORK_STATUS]: broadcastNetworkStatus,
  [LOAD_GAME_REQUESTED]: loadGame,
  [FIRE_CANNON_REQUESTED]: fireCannon,
  [NEW_GAME_REQUESTED]: newGame,
  [GAMES_REQUESTED]: gamesRequest,
  [JOIN_GAME_REQUESTED]: joinGame,
}
