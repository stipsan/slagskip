import invariant from 'invariant'

import {
  FRIENDS_SUCCESS,
  FRIENDS_FAILURE,
} from '../constants/ActionTypes'

export const friendsRequest = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  const friendIds = getState().getIn(['viewer', 'friendIds'])
  const invites = getState().getIn(['viewer', 'invites'])
  return database.getFriends({
    id: authToken.id,
    friends: friendIds,
    invites
  }, redis)
    .then(friends => {
      callback(null, { type: FRIENDS_SUCCESS, friends })
    }).catch(error => {
      console.error(FRIENDS_FAILURE, error)
      callback(FRIENDS_FAILURE, error)
    })
}
