import {
  CHECK_CAPABILITIES,
  SOCKET_REQUEST,
} from '../constants/ActionTypes'
import { replace } from 'react-router-redux'

export const checkAuth = (isAuthenticated, pathname) => dispatch => {
  if (!isAuthenticated && pathname !== '/login') {
      dispatch(replace({ pathname: '/login', state: { redirectAfterLogin: pathname } }));
  }
}