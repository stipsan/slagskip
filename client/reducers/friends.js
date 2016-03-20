import * as TYPE from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'


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