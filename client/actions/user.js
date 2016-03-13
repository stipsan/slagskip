import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/ActionTypes'
import {
  loginRequest,
} from '../socket'


export const login = username => {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST })
    loginRequest(
      username,
      data => {
        const { viewer, friends } = data
        dispatch({
          type: LOGIN_SUCCESS,
          friends,
          ...viewer
        })
      },
      message => dispatch({ type: LOGIN_FAILURE, message })
    );
  }
}