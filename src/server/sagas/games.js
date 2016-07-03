import { socketEmit } from 'redux-saga-sc'
import { fork, call, take, put, select } from 'redux-saga/effects'

import {
  GAMES_REQUESTED,
} from '../constants/ActionTypes'
import { getGameIds } from '../selectors'

export function *getGames({ successType, failureType }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const gameIds = yield select(getGameIds)
    let games = yield call(database.getGames, {
      id: authToken.id,
      games: gameIds
    }, redis)
    const versusIds = games.map(game => {
      const isViewerFirst = game.players[0] === authToken.id
      return isViewerFirst ? game.players[1] : game.players[0]
    })
    console.log(games)
    yield put(socketEmit({ type: successType, payload: { games } }))
  } catch (error) {
    yield put(socketEmit({ type: failureType, payload: { error } }))
  }
}

export function *watchGames(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(GAMES_REQUESTED)
    yield fork(getGames, payload, socket, database, redis)
  }
}
