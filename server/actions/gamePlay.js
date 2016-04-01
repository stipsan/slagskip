import invariant from 'invariant'
import { LOCATION_CHANGE } from 'react-router-redux'
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
  FIRE_CANNON_SUCCESS,
  FIRE_CANNON_FAILURE,
} from '../constants/ActionTypes'

export const loadGame = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
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

      let gameState = game.boards.length > 1 ? 'ready' : (
        isViewerFirst ?
        'waiting' :
        'setup'
      )
      
      if(game.scores.indexOf(21) !== -1) {
        if(isViewerFirst) {
          gameState = game.scores[0] === 21 ? 'victory' : 'defeat'
        } else {
          gameState = game.scores[1] === 21 ? 'victory' : 'defeat'
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
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  return database.newGame(authToken, action.versus, action.board, redis)
    .then(gameId => {
      invariant(gameId, 'Failed to create new game')

      callback(null, {
        type: NEW_GAME_SUCCESS,
        id: gameId,
        versus: action.versus,
      })
      
      socket.exchange.publish(`user:${action.versus}`, {
        type: RECEIVE_NEW_GAME,
        id: gameId,
        versus: authToken.id,
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
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  return database.joinGame(authToken, action.game, action.board, redis)
    .then(game => {
      invariant(game.id, 'Failed to join game')

      const isViewerFirst = game.players[0] === authToken.id
      const versus = isViewerFirst ? game.players[1] : game.players[0]

      callback(null, {
        type: JOIN_GAME_SUCCESS,
        id: game.id,
      })
      
      socket.exchange.publish(`user:${versus}`, {
        type: RECEIVE_JOIN_GAME,
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
  
  const hits = getState().getIn(['match', 'hits']).count(previousHit => previousHit === hit)
  
  let foundItem = false, incViewerScore = 0
  
  if(hit === 1 && hits === 4) {
    foundItem = 1
    incViewerScore = 5
  }
  if(hit === 2 && hits === 3) {
    foundItem = 2
    incViewerScore = 4
  }
  if(hit === 3 && hits === 2) {
    foundItem = 3
    incViewerScore = 3
  }
  if(hit === 4 && hits === 2) {
    foundItem = 4
    incViewerScore = 3
  }
  if(hit === 5 && hits === 1) {
    foundItem = 5
    incViewerScore = 2
  }
  if(hit === 6 && hits === 1) {
    foundItem = 6
    incViewerScore = 2
  }
  if(hit === 7) {
    foundItem = 7
    incViewerScore = 1
  }
  if(hit === 8) {
    foundItem = 8
    incViewerScore = 1
  }
  
  const turn = { id: authToken.id, index: selectedCell, hit: hit !== 0, foundItem, on: new Date().getTime() }
  
  return database.saveTurn(authToken, action.id, turn, redis)
    .then(game => {
      callback(null, {
        type: FIRE_CANNON_SUCCESS,
        isViewerTurn: hit !== 0,
        viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
      })
      dispatch({
        type: FIRE_CANNON_SUCCESS,
        viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
        hit,
      })
      socket.exchange.publish(`user:${getState().getIn(['game', 'versus'])}`, {
        type: hit !== 0 ? RECEIVE_HIT : RECEIVE_MISS,
        versusScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
      })
    }).catch(error => {
      console.error(FIRE_CANNON_FAILURE, error)
      callback(FIRE_CANNON_FAILURE, error.message || error)
    })
}