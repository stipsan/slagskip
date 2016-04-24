import {
  CHECK_CAPABILITIES,
  SOCKET_REQUEST,
} from '../constants/ActionTypes'

export const init = () => dispatch => {
  dispatch({ type: CHECK_CAPABILITIES })
  dispatch({ type: SOCKET_REQUEST })
}
