import { combineReducers } from 'redux'
import {
  RECEIVE_FRIEND,
} from '../constants/ActionTypes'

const viewer = (state = {username: 'Ironman'}, action) => {
  switch (action.type) {
    default:
      return state
  }
};

const friends = (state = [{username: 'Superman'}, {username: 'Batman'}], action) => {
  switch (action.type) {
    case RECEIVE_FRIEND:
      return state
    default:
      return state
  }
};

export default combineReducers({
  viewer,
  friends,
});