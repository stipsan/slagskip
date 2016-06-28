import { socketEmit } from 'redux-saga-sc'
import { fork, call, take, put, select } from 'redux-saga/effects'

import {
  FRIENDS_REQUESTED,
} from '../constants/ActionTypes'
import { getFriendIds, getInvites } from '../selectors'

export function *getFriends({ successType, failureType }, socket, database, redis) {
  try {
    const friendIds = yield select(getFriendIds)
    const invites = yield select(getInvites)
    const friends = yield call(database.getFriends, {
      id: socket.getAuthToken().id,
      friends: friendIds,
      invites
    }, redis)
    yield put(socketEmit({ type: successType, payload: { friends } }))
  } catch (err) {
    yield put(socketEmit({ type: failureType, payload: { err } }))
  }
}

export function *watchFriends(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(FRIENDS_REQUESTED)
    yield fork(getFriends, payload, socket, database, redis)
  }
}
