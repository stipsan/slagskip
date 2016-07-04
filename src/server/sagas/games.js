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
    games = games.map(game => {
      const isViewerFirst = game.players[0] === authToken.id
      const isFriendFirst = game.players[1] === authToken.id

      const waitingState = isViewerFirst ? 'waiting' : 'setup'
      let gameState = 1 < game.boards.length ? 'ready' : waitingState

      if (-1 !== game.scores.indexOf(21)) {
        if (isViewerFirst) {
          gameState = 21 === game.scores[0] && 21 !== game.scores[1] ? 'victory' : 'defeat'
        } else {
          gameState = 21 === game.scores[1] ? 'victory' : 'defeat'
        }
      }

      return {
        id: game.id,
        versus: isViewerFirst ? game.players[1] : game.players[0],
        viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
        turns: game.turns,
        gameState,
        isViewerFirst,
        isFriendFirst,
      }
    })
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
