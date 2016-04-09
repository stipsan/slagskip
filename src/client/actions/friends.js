import { CALL_SOCKET } from '../middleware/socket'
import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_FAILURE,
} from '../constants/ActionTypes'

export function fetchFriends() {
  return {
    [CALL_SOCKET]: {
      types: [ FRIENDS_REQUEST, FRIENDS_SUCCESS, FRIENDS_FAILURE ]
    },
  }
}