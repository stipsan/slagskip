import { combineReducers } from 'redux'
import * as TYPE from '../constants/ActionTypes'

const connected = (state = false, action) => {
  switch (action.type) {
    case TYPE.SOCKET_SUCCESS:
      return true
    default:
      return state
  }
};
const disconnected = (state = false, action) => {
  switch (action.type) {
    case TYPE.SOCKET_SUCCESS:
      return false
    case TYPE.SOCKET_FAILURE:
      return true
    default:
      return state
  }
};

const viewer = (state = {username: '', loggedIn: false}, action) => {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
      }
    case TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        username: '',
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
  // why separate connected and disconnected?
  // connected = false && disconnected = false => attempting to connect socket
  // connected = false && disconnected = true => connecting failed, could be firewall
  // connected = true && disconnected = false => socket is live and connected
  // connected = true && disconnected = true => our live connection disconnected
  connected,
  disconnected,
  viewer,
  friends,
  invites,
  requests,
});