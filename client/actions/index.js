import {
  RECEIVE_FRIEND,
} from '../constants/ActionTypes'

export const receiveFriend = friend => {
  return { type: RECEIVE_FRIEND, friend }
};