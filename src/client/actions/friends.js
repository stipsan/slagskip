import {
  FRIENDS_REQUESTED,
  FRIENDS_SUCCESS,
  FRIENDS_FAILURE,
} from '../constants/ActionTypes'

export const fetchFriends = friendIds => {
  return {
    type: FRIENDS_REQUESTED,
    payload: {
      successType: FRIENDS_SUCCESS,
      failureType: FRIENDS_FAILURE,
      friendIds,
    }
  }
}
