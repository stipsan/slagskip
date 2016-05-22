import {
  CHECK_CAPABILITIES,
  SOCKET_REQUESTED,
} from '../constants/ActionTypes'

export const init = () => dispatch => {
  dispatch({ type: CHECK_CAPABILITIES })
  dispatch({ type: SOCKET_REQUESTED })
}
