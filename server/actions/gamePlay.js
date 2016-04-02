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
  RANDOM_ITEMS,
} from '../constants/ActionTypes'
import { board as boardReducer } from '../reducers/board'

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

      // We have a game versus a bot!
      if(action.versus === '-1') {
        const botToken = {
          id: "-1"
        }
        const botBoard = boardReducer(undefined, { type: RANDOM_ITEMS })
        
        return database.joinGame(botToken, gameId, botBoard.toJS(), redis)
          .then(game => {
            invariant(game.id, 'Bot failed to join game')

            const isViewerFirst = true
            const versus = isViewerFirst ? game.players[1] : game.players[0]

            // notify human
            callback(null, {
              type: NEW_GAME_SUCCESS,
              id: gameId,
              versus: botToken.id,
            })

            // notify human that game is ready
            socket.exchange.publish(`user:${authToken.id}`, {
              type: RECEIVE_JOIN_GAME,
              id: gameId,
            })
        }).catch(error => {
          console.error(JOIN_GAME_FAILURE, error)
          callback(JOIN_GAME_FAILURE, error.message || error)
        })
      }

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
  
  const turn = { id: authToken.id, index: selectedCell, hit: hit !== 0, foundItem: hit !== 0 > 0 && hit, on: new Date().getTime() }
  
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
        hits: [],
      })
      socket.exchange.publish(`user:${getState().getIn(['game', 'versus'])}`, {
        type: hit !== 0 ? RECEIVE_HIT : RECEIVE_MISS,
        versusScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
        id: action.id,
        turn,
      })
      
      if(game.players[1] === '-1' && hit === 0) {
        const botToken = { id: '-1' }
        const state = getState()
        let turnsPlayedByBot = game.turns.reduce((turnsByBot, turn) => {
          return turn.id === '-1' ? [...turnsByBot, turn.index] : turnsByBot
        }, [])
        
        if(turnsPlayedByBot.length === 99) return false // game over
        
        let lookForAvailableSpot = true
        let botTurns = []
        let botSelectedCell = false
        while(lookForAvailableSpot) {
          let randomSpot = Math.floor(Math.random() * 100)
          if(turnsPlayedByBot.indexOf(randomSpot) === -1) {
            botSelectedCell = randomSpot
            const botHit = getState().getIn(['match', 'viewerBoard', botSelectedCell])
            botTurns.push({ id: botToken.id, index: botSelectedCell, hit: botHit !== 0, foundItem: botHit !== 0 > 0 && botHit, on: new Date().getTime() })
            if(botHit === 0) {
              lookForAvailableSpot = false
            }
          }
          
          // safeguarding against fatal infinite loops
          if(botTurns.length + turnsPlayedByBot.length > 98) {
            lookForAvailableSpot = false
          }
        }
                
        botTurns.forEach((botTurn, index) => {
          // lets timeout the response so the user is able to notice the bot already responded
          setTimeout(function(botTurn) {
            database.saveTurn(botToken, action.id, botTurn, redis).then(game => {

                socket.exchange.publish(`user:${authToken.id}`, {
                  type: botTurn.hit ? RECEIVE_HIT : RECEIVE_MISS,
                  versusScore: game.scores[1],
                  id: action.id,
                  turn: botTurn,
                })
              
              
            }).catch(error => {
              // @TODO type should be RECEIVE_BOT_FAILURE
              console.error(FIRE_CANNON_FAILURE, error)

              socket.exchange.publish(`user:${authToken.id}`, {
                type: FIRE_CANNON_FAILURE,
                data: error.message || error
              })
            })
          }.bind(this, botTurn), 1000 * (index + 1))
        })
      }
    }).catch(error => {
      console.error(FIRE_CANNON_FAILURE, error)
      callback(FIRE_CANNON_FAILURE, error.message || error)
    })
}