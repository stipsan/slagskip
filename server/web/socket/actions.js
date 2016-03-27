import {
  AUTHENTICATE_REQUEST,
} from '../../constants/ActionTypes'
import {
  authenticateRequest,
} from '../../actions'

export const actions = {
  [AUTHENTICATE_REQUEST]: authenticateRequest,
}