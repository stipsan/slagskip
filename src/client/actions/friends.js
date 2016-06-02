import {
  FRIENDS_REQUESTED,
  FRIENDS_SUCCESS,
  FRIENDS_FAILURE,
} from '../constants/ActionTypes'
import { CALL_SOCKET } from '../middleware/socket'

export function fetchFriends() {
  return {
    [CALL_SOCKET]: {
      types: [FRIENDS_REQUESTED, FRIENDS_SUCCESS, FRIENDS_FAILURE]
    },
  }
}
