import {
  CHECK_CAPABILITIES,
  SOCKET_REQUEST,
} from '../constants/ActionTypes'

export const checkAuth = (isAuthenticated, redirectAfterLogin) => dispatch => {
  dispatch({ type: CHECK_CAPABILITIES })
  dispatch({ type: SOCKET_REQUEST })
}