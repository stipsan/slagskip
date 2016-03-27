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
  return database.getViewer(socket.getAuthToken(), redis)
    .then(viewer => {
      invariant(viewer.authToken, 'database.getViewer failed to return an authToken')
      invariant(viewer.authToken.id, 'database.getViewer authToken did not contain the property `id`')
      invariant(viewer.friendIds, 'database.getViewer did not contain the property `friendIds`')

      return database.getFriends({
        id: viewer.authToken.id,
        friends: viewer.friendIds,
        invites: viewer.invites
      }, redis)
    }).then(friends => {
      callback(null, { type: FRIENDS_SUCCESS, friends })
    }).catch(error => {
      console.error(FRIENDS_FAILURE, error)
      res(FRIENDS_FAILURE, error)
    })
}