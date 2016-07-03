import invariant from 'invariant'
import { socketEmit } from 'redux-saga-sc'
import { cps, fork, call, take, put } from 'redux-saga/effects'

import {
  NEW_GAME_REQUESTED,
  RECEIVE_NEW_GAME,
  LOAD_GAME_REQUESTED,
  RECEIVE_JOIN_GAME,
  JOIN_GAME_REQUESTED,
} from '../constants/ActionTypes'

export function *getNewGame({ successType, failureType, ...game }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const gameId = yield call(database.newGame, authToken, game.versus, game.board, redis)
    invariant(gameId, 'Failed to create new game')
    yield put(socketEmit({ type: successType, payload: {
      id: gameId,
      versus: game.versus,
    } }))
    yield cps([socket.exchange, socket.exchange.publish], `user:${game.versus}`, {
      type: RECEIVE_NEW_GAME,
      payload: {
        id: gameId,
        versus: authToken.id,
      }
    })
  } catch ({ name, message }) {
    yield put(socketEmit({ type: failureType, payload: { name, message } }))
  }
}

export function *watchNewGame(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(NEW_GAME_REQUESTED)
    yield fork(getNewGame, payload, socket, database, redis)
  }
}

export function *getGame({ successType, failureType, id }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const game = yield call(database.loadGame, authToken, id, redis)
    invariant(game.id, '404 Game Not Found')

    const isViewerFirst = game.players[0] === authToken.id
    const isFriendFirst = game.players[1] === authToken.id

    invariant(
      isViewerFirst !== isFriendFirst,
      'Both players cannot be first! First: %s Last: %s authToken: %s',
      game.players[0],
      game.players[1],
      authToken.id
    )

    const notReadyState = isViewerFirst ? 'waiting' : 'setup'
    let gameState = 1 < game.boards.length ? 'ready' : notReadyState

    if (-1 !== game.scores.indexOf(21)) {
      if (isViewerFirst) {
        gameState = 21 === game.scores[0] && 21 !== game.scores[1] ? 'victory' : 'defeat'
      } else {
        gameState = 21 === game.scores[1] ? 'victory' : 'defeat'
      }
    }

    yield put({
      type: successType, payload: {
        id: game.id,
        versus: isViewerFirst ? game.players[1] : game.players[0],
        viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
        versusBoard: isViewerFirst ? game.boards[1] : game.boards[0],
        turns: game.turns,
        gameState,
        isViewerFirst,
        viewerScore: isViewerFirst ? game.scores[0] : game.scores[1],
        versusScore: isViewerFirst ? game.scores[1] : game.scores[0],
        hits: []
      }
    })
    yield put(socketEmit({ type: successType, payload: {
      id: game.id,
      versus: isViewerFirst ? game.players[1] : game.players[0],
      viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
      turns: game.turns,
      viewerScore: isViewerFirst ? game.scores[0] : game.scores[1],
      versusScore: isViewerFirst ? game.scores[1] : game.scores[0],
      gameState,
      isViewerFirst,
      isFriendFirst,
    } }))
    yield cps([socket.exchange, socket.exchange.publish], `user:${game.versus}`, {
      type: RECEIVE_JOIN_GAME,
      payload: {
        id: game.id,
        versus: authToken.id,
      }
    })
  } catch ({ name, message }) {
    yield put(socketEmit({ type: failureType, payload: { name, message } }))
  }
}

export function *watchLoadGame(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(LOAD_GAME_REQUESTED)
    yield fork(getGame, payload, socket, database, redis)
  }
}

export function *joinGame({ successType, failureType, ...payload }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const game = yield call(database.joinGame, authToken, payload.game, payload.board, redis)
    invariant(game.id, '404 Game Not Found')

    const isViewerFirst = game.players[0] === authToken.id
    const versus = isViewerFirst ? game.players[1] : game.players[0]

    yield put(socketEmit({ type: successType, payload: {
      id: game.id,
    } }))
    yield cps([socket.exchange, socket.exchange.publish], `user:${game.versus}`, {
      type: RECEIVE_JOIN_GAME,
      payload: {
        id: game.id,
      }
    })
  } catch ({ name, message }) {
    yield put(socketEmit({ type: failureType, payload: { name, message } }))
  }
}

export function *watchJoinGame(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(JOIN_GAME_REQUESTED)
    yield fork(joinGame, payload, socket, database, redis)
  }
}
