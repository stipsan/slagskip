import invariant from 'invariant'
import { socketEmit } from 'redux-saga-sc'
import { cps, fork, call, take, put, select } from 'redux-saga/effects'

import bots from '../bots'
import {
  NEW_GAME_REQUESTED,
  RECEIVE_NEW_GAME,
  LOAD_GAME_REQUESTED,
  RECEIVE_JOIN_GAME,
  JOIN_GAME_REQUESTED,
  RANDOM_ITEMS,
  SAVE_TURN_REQUESTED,
  RECEIVE_MISS,
  RECEIVE_HIT,
} from '../constants/ActionTypes'
import { board as boardReducer } from '../reducers/board'
import { getVersusCell, getMatch } from '../selectors'

export function *getNewGame({ successType, failureType, ...game }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const gameId = yield call(database.newGame, authToken, game.versus, game.board, redis)
    invariant(gameId, 'Failed to create new game')

    yield put(socketEmit({ type: successType, payload: {
      id: gameId,
      versus: game.versus,
    } }))
    // We have a game versus a bot!
    if (bots.hasOwnProperty(game.versus)) {
      const botToken = {
        id: game.versus
      }
      const botBoard = boardReducer(undefined, {
        type: RANDOM_ITEMS,
        getRotated: bots[game.versus].getRotated
      })

      const botGame = yield call(database.joinGame, botToken, gameId, botBoard.toJS(), redis)
      invariant(botGame.id, 'Bot failed to join game')

      // notify human that game is ready
      yield cps([socket.exchange, socket.exchange.publish], `user:${authToken.id}`, {
        type: RECEIVE_JOIN_GAME,
        payload: {
          id: gameId,
        }
      })

    } else {
      yield cps([socket.exchange, socket.exchange.publish], `user:${game.versus}`, {
        type: RECEIVE_NEW_GAME,
        payload: {
          id: gameId,
          versus: authToken.id,
        }
      })
    }

  } catch ({ name, message }) {
    yield put(socketEmit({ type: failureType, payload: { error: { name, message } } }))
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
    yield put(socketEmit({ type: failureType, payload: { error: { name, message } } }))
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
    yield put(socketEmit({ type: failureType, payload: { error: { name, message } } }))
  }
}

export function *watchJoinGame(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(JOIN_GAME_REQUESTED)
    yield fork(joinGame, payload, socket, database, redis)
  }
}

export function *saveTurn({ successType, failureType, ...payload }, socket, database, redis) {
  try {
    const authToken = socket.getAuthToken()
    const { selectedCell } = payload

    const hit = yield select(getVersusCell, selectedCell)

    // Something went wrong
    if (-1 === hit || undefined === hit) {
      throw new Error('Game data is missing')
    }

    const turn = {
      id: authToken.id,
      index: selectedCell,
      hit: 0 !== hit,
      foundItem: 0 < hit && hit,
      on: new Date().getTime()
    }

    const game = yield call(database.saveTurn, authToken, payload.id, turn, redis)

    const isViewerFirst = game.players[0] === authToken.id
    const versusId = isViewerFirst ? game.players[1] : game.players[0]

    const successAction = { type: successType, payload: {
      viewerScore: isViewerFirst ? game.scores[0] : game.scores[1],
      id: game.id,
      turn,
      hit,
      hits: [],
    } }
    yield put(successAction)
    yield cps([socket.exchange, socket.exchange.publish], `user:${versusId}`, {
      type: 0 === hit ? RECEIVE_MISS : RECEIVE_HIT,
      payload: {
        versusScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: payload.id,
        turn,
      }
    })
    yield put(socketEmit({
      type: successType,
      payload: {
        isViewerTurn: 0 !== hit,
        viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: payload.id,
        turn,
      }
    }))

    if (bots.hasOwnProperty(game.players[1]) && 0 === hit && 21 > game.scores[0]) {
      const getBotTurns = bots[game.players[1]].getTurns
      const botToken = { id: game.players[1] }

      const turnsPlayedByBot = game.turns.reduce((turnsByBot, cturn) =>
        (cturn.id === botToken.id ? [...turnsByBot, cturn.index] : turnsByBot)
      , [])
      const successfullTurnsPlayedByBot = game.turns.reduce((turnsByBot, cturn) =>
        (cturn.id === botToken.id && cturn.hit ? [...turnsByBot, cturn.index] : turnsByBot)
      , [])

      // if (99 === turnsPlayedByBot.length) return false // game over

      const match = yield select(getMatch)
      const viewerBoard = match.get('viewerBoard')
      const botTurns = getBotTurns(
        botToken,
        match,
        turnsPlayedByBot,
        successfullTurnsPlayedByBot,
        viewerBoard
      )
      console.log('botTurns', botTurns)
      for (let i = 0, len = botTurns.length; i < len; i++) {
        const botTurn = botTurns[i]
        console.log(i, 'botTurn', botTurn)
        const { scores } = yield call(database.saveTurn, botToken, payload.id, botTurn, redis)
        console.log('database.saveTurn', botToken, payload.id, botTurn)
        yield cps([socket.exchange, socket.exchange.publish], `user:${authToken.id}`, {
          type: botTurn.hit ? RECEIVE_HIT : RECEIVE_MISS,
          payload: {
            versusScore: scores[1],
            id: payload.id,
            turn: botTurn,
          }
        })
      }
    }
  } catch ({ name, message }) {
    yield put(socketEmit({ type: failureType, payload: { error: { name, message } } }))
  }
}

export function *watchSaveTurn(socket, database, redis) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(SAVE_TURN_REQUESTED)
    yield fork(saveTurn, payload, socket, database, redis)
  }
}
