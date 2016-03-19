import { routerReducer, LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as TYPE from '../constants/ActionTypes'

const capabilities = (state = {
  websocket: true,
}, action) => {
  switch (action.type) {
  case TYPE.CHECK_CAPABILITIES:
    return {
      ...state,
      websocket: !!global.WebSocket,
    }
  default:
    return state
  }
}

const connected = (state = false, action) => {
  switch (action.type) {
  case TYPE.SOCKET_SUCCESS:
    return true
  default:
    return state
  }
}
const disconnected = (state = false, action) => {
  switch (action.type) {
  case TYPE.SOCKET_SUCCESS:
    return false
  case TYPE.SOCKET_FAILURE:
    return true
  default:
    return state
  }
}

export const viewer = (state = {username: '', isAuthenticated: false}, action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      username: action.username,
    }
  case TYPE.LOGOUT_SUCCESS:
    return {
      ...state,
      isAuthenticated: false,
      username: '',
    }
  default:
    return state
  }
}


// state can be authenticated, pending or unauthenticated
export const auth = (state = {
  isAuthenticated: false,
  authState: 'pending',
  authToken: null,
  redirectAfterLogin: '/',
}, action) => {
  switch (action.type) {
  case TYPE.SOCKET_SUCCESS:
    return {
      ...state,
      isAuthenticated: action.isAuthenticated,
      authState: action.isAuthenticated ? 'authenticated' : 'unauthenticated',
    }
  case TYPE.RECEIVE_AUTH_STATE_CHANGE:
    return {
      ...state,
      isAuthenticated: action.newState === 'authenticated',
      authState: action.newState,
      authToken: action.authToken,
    }
  case LOCATION_CHANGE:
    return {
      ...state,
      redirectAfterLogin: action.payload.state && action.payload.state.redirectAfterLogin
    }
  default:
    return state
  }
}



const defaultFriend = {
  online: false,
  lastVisit: null,
}

const friends = (state = [], action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return action.friends.map(friend => {
      return { ...defaultFriend, ...friend }
    })
  case TYPE.RECEIVE_FRIEND:
    return [
      ...state,
      {
        ...defaultFriend,
        username: action.username,
        online: action.online,
      },
    ]
  case TYPE.RECEIVE_FRIEND_NETWORK_STATUS:
    return state.map(friend => 
        // @TODO should use ids as usernames could change
        friend.username === action.username ?
          Object.assign({}, friend, action) :
          friend
      )
  default:
    return state
  }
}

const invites = (state = new Set([]), action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return new Set(action.invites)
  case TYPE.RECEIVE_GAME_INVITE:
  case TYPE.RECEIVE_GAME_INVITE_ACCEPTED:
    return new Set([
      ...state,
      action.username,
    ])
  case TYPE.DECLINE_GAME_INVITE_SUCCESS:
  case TYPE.CANCEL_GAME_INVITE_SUCCESS:
    var nextState = new Set([...state])
    nextState.delete(action.username)
    return nextState
  default:
    return state
  }
}

const requests = (state = new Set([]), action) => {
  switch (action.type) {
  case TYPE.LOGIN_SUCCESS:
    return new Set(action.requests)
  case TYPE.GAME_INVITE_SUCCESS:
  case TYPE.ACCEPT_GAME_INVITE_SUCCESS:
    return new Set([
      ...state,
      action.username,
    ])
  case TYPE.RECEIVE_GAME_INVITE_DECLINED:
  case TYPE.CANCEL_GAME_INVITE_SUCCESS:
    var nextState = new Set([...state])
    nextState.delete(action.username)
    return nextState
  default:
    return state
  }
}

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
  auth,
  requests,
  capabilities,
  routing: routerReducer,
})