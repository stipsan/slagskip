import {
  CHECK_CAPABILITIES,
  SOCKET_REQUEST,
} from '../constants/ActionTypes'
import { replace } from 'react-router-redux'

// @TODO use the react-router-redux action types directly instead of relying on redux-thunk for this

export const redirectToLogin = redirectAfterLogin => {
  return replace({ pathname: '/login', state: { redirectAfterLogin } })
}

export const restoreLocation = location => {
  return replace(location.toJS())
}