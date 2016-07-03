import invariant from 'invariant'

import bots from '../bots'
import {
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  RECEIVE_NEW_GAME,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILURE,
  RECEIVE_JOIN_GAME,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  RECEIVE_HIT,
  RECEIVE_MISS,
  SAVE_TURN_SUCCESS,
  SAVE_TURN_FAILURE,
  RANDOM_ITEMS,
} from '../constants/ActionTypes'
import { board as boardReducer } from '../reducers/board'

export const loadGame = (
  action,
  callback,
  socket,
  database,
  redis
) => dispatch => {
  const authToken = socket.getAuthToken()
  return database.loadGame(authToken, action.id, redis)
    .then(game => {
      invariant(game.id, 'Requires gameId to be returned')

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

      dispatch({
        type: LOAD_GAME_SUCCESS,
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
      })
      callback(null, {
        type: LOAD_GAME_SUCCESS,
        id: game.id,
        versus: isViewerFirst ? game.players[1] : game.players[0],
        viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
        turns: game.turns,
        viewerScore: isViewerFirst ? game.scores[0] : game.scores[1],
        versusScore: isViewerFirst ? game.scores[1] : game.scores[0],
        gameState,
        isViewerFirst,
        isFriendFirst,
      })
    }).catch(error => {
      console.error(LOAD_GAME_FAILURE, error)
      callback(LOAD_GAME_FAILURE, error.message || error)
    })
}

export const newGame = (
  action,
  callback,
  socket,
  database,
  redis
) => () => {
  const authToken = socket.getAuthToken()
  return database.newGame(authToken, action.versus, action.board, redis)
    .then(gameId => {
      invariant(gameId, 'Failed to create new game')

      // We have a game versus a bot!
      if (bots.hasOwnProperty(action.versus)) {
        const botToken = {
          id: action.versus
        }
        const botBoard = boardReducer(undefined, {
          type: RANDOM_ITEMS,
          getRotated: bots[action.versus].getRotated
        })

        return database.joinGame(botToken, gameId, botBoard.toJS(), redis)
          .then(game => {
            invariant(game.id, 'Bot failed to join game')

            // notify human that game is ready
            socket.exchange.publish(`user:${authToken.id}`, {
              type: RECEIVE_JOIN_GAME,
              id: gameId,
            })

            // notify human
            return callback(null, {
              type: NEW_GAME_SUCCESS,
              id: gameId,
              versus: botToken.id,
            })
          }).catch(error => {
            console.error(JOIN_GAME_FAILURE, error)
            callback(JOIN_GAME_FAILURE, error.message || error)
          })
      }

      socket.exchange.publish(`user:${action.versus}`, {
        type: RECEIVE_NEW_GAME,
        id: gameId,
        versus: authToken.id,
      })

      return callback(null, {
        type: NEW_GAME_SUCCESS,
        id: gameId,
        versus: action.versus,
      })
    }).catch(error => {
      console.error(NEW_GAME_FAILURE, error)
      callback(NEW_GAME_FAILURE, error.message || error)
    })
}

export const joinGame = (
  action,
  callback,
  socket,
  database,
  redis
) => () => {
  const authToken = socket.getAuthToken()
  return database.joinGame(authToken, action.game, action.board, redis)
    .then(game => {
      invariant(game.id, 'Failed to join game')

      const isViewerFirst = game.players[0] === authToken.id
      const versus = isViewerFirst ? game.players[1] : game.players[0]

      socket.exchange.publish(`user:${versus}`, {
        type: RECEIVE_JOIN_GAME,
        id: game.id,
      })

      return callback(null, {
        type: JOIN_GAME_SUCCESS,
        id: game.id,
      })
    }).catch(error => {
      console.error(JOIN_GAME_FAILURE, error)
      callback(JOIN_GAME_FAILURE, error.message || error)
    })
}

export const fireCannon = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  const { selectedCell } = action

  const hit = getState().getIn(['match', 'versusBoard', selectedCell])

  // Something went wrong
  if (-1 === hit || undefined === hit) {
    const error = 'Game data is missing'
    console.error(SAVE_TURN_FAILURE, error)
    return callback(SAVE_TURN_FAILURE, error)
  }

  const turn = {
    id: authToken.id,
    index: selectedCell,
    hit: 0 !== hit,
    foundItem: 0 < hit && hit,
    on: new Date().getTime()
  }

  return database.saveTurn(authToken, action.id, turn, redis)
    .then(game => {
      dispatch({
        type: SAVE_TURN_SUCCESS,
        viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
        hit,
        hits: [],
      })
      socket.exchange.publish(`user:${getState().getIn(['game', 'versus'])}`, {
        type: 0 === hit ? RECEIVE_MISS : RECEIVE_HIT,
        versusScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
      })

      if (bots.hasOwnProperty(game.players[1]) && 0 === hit && 21 > game.scores[0]) {

        const getBotTurns = bots[game.players[1]].getTurns
        const botToken = { id: game.players[1] }

        const turnsPlayedByBot = game.turns.reduce((turnsByBot, cturn) =>
          (cturn.id === botToken.id ? [...turnsByBot, cturn.index] : turnsByBot)
        , [])
        const successfullTurnsPlayedByBot = game.turns.reduce((turnsByBot, cturn) =>
          (cturn.id === botToken.id && cturn.hit ? [...turnsByBot, cturn.index] : turnsByBot)
        , [])

        if (99 === turnsPlayedByBot.length) return false // game over

        const viewerBoard = getState().getIn(['match', 'viewerBoard'])
        const botTurns = getBotTurns(
          botToken,
          getState,
          turnsPlayedByBot,
          successfullTurnsPlayedByBot,
          viewerBoard
        )

        botTurns.forEach((botTurn, index) => {
          // lets timeout the response so the user is able to notice the bot already responded
          setTimeout(function delayBotTurn(delayedBotTurn) {
            database.saveTurn(botToken, action.id, delayedBotTurn, redis).then(({ scores }) => {

              socket.exchange.publish(`user:${authToken.id}`, {
                type: delayedBotTurn.hit ? RECEIVE_HIT : RECEIVE_MISS,
                versusScore: scores[1],
                id: action.id,
                turn: botTurn,
              })
            }).catch(error => {
              // @TODO type should be RECEIVE_BOT_FAILURE
              console.error(SAVE_TURN_FAILURE, error)

              socket.exchange.publish(`user:${authToken.id}`, {
                type: SAVE_TURN_FAILURE,
                data: error.message || error
              })
            })
          }.bind(this, botTurn), 1000 * (index + 1))
        })
      }

      return callback(null, {
        type: SAVE_TURN_SUCCESS,
        isViewerTurn: 0 !== hit,
        viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
      })
    }).catch(error => {
      console.error(SAVE_TURN_FAILURE, error)
      callback(SAVE_TURN_FAILURE, error.message || error)
    })
}
