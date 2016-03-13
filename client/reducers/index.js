import { combineReducers } from 'redux'
import * as TYPE from '../constants/ActionTypes'

const serverConnection = (state = true, action) => {
  switch (action.type) {
    case TYPE.SERVER_DISCONNECTED:
      return false
    case TYPE.SERVER_CONNECTED:
      return true
    default:
      return state
  }
};

const viewer = (state = {username: 'Ironman'}, action) => {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
      }
    default:
      return state
  }
};

const friends = (state = [{username: 'Superman'}, {username: 'Batman'}, {username: 'Spiderman'}, {username: 'StarLord'}], action) => {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return action.friends
    case TYPE.RECEIVE_FRIEND:
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

const invites = (state = ['Superman', 'Spiderman'], action) => {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return action.invites
    case TYPE.RECEIVE_GAME_INVITE:
      return [
        ...state,
        action.username
      ]
    case TYPE.DECLINE_GAME_INVITE_SUCCESS:
      return state.filter(username => username !== action.username)
    default:
      return state
  }
};

const requests = (state = ['Superman', 'Batman'], action) => {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return action.requests
    case TYPE.GAME_INVITE_SUCCESS:
    case TYPE.ACCEPT_GAME_INVITE_SUCCESS:
      return [
        ...state,
        action.username
      ]
    case TYPE.RECEIVE_GAME_INVITE_DECLINED:
      return state.filter(username => username !== action.username)
    default:
      return state
  }
};

export default combineReducers({
  serverConnection,
  viewer,
  friends,
  invites,
  requests,
});