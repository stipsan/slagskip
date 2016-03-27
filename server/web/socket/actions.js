import {
  AUTHENTICATE_REQUEST,
  DEAUTHENTICATE_REQUEST,
  FRIENDS_REQUEST,
} from '../../constants/ActionTypes'
import {
  authenticateRequest,
  deauthenticateRequest,
  friendsRequest,
} from '../../actions'

export const actions = {
  [AUTHENTICATE_REQUEST]: authenticateRequest,
  [DEAUTHENTICATE_REQUEST]: deauthenticateRequest,
  [FRIENDS_REQUEST]: friendsRequest,
}