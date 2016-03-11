import { combineReducers } from 'redux'
import {
  SERVER_DISCONNECTED,
  SERVER_CONNECTED,
  RECEIVE_FRIEND,
} from '../constants/ActionTypes'

const serverConnection = (state = true, action) => {
  switch (action.type) {
    case SERVER_DISCONNECTED:
      return false
    case SERVER_CONNECTED:
      return true
    default:
      return state
  }
};

const viewer = (state = {username: 'Ironman'}, action) => {
  switch (action.type) {
    default:
      return state
  }
};

const friends = (state = [{username: 'Superman'}, {username: 'Batman'}], action) => {
  switch (action.type) {
    case RECEIVE_FRIEND:
      return [
        ...state,
        {
          username: action.username
        }
      ]
    default:
      return state
  }
};

export default combineReducers({
  serverConnection,
  viewer,
  friends,
});