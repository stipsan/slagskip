import * as TYPE from '../constants/ActionTypes'

export const receiveFriend = friend => {
  return { type: TYPE.RECEIVE_FRIEND, friend }
};

export const inviteFriend = friend => {
  return { type: TYPE.GAME_INVITE_SUCCESS, friend }
};
export const acceptInvite = friend => {
  return { type: TYPE.ACCEPT_GAME_INVITE_SUCCESS, friend }
};
export const declineInvite = friend => {
  return { type: TYPE.DECLINE_GAME_INVITE_SUCCESS, friend }
};