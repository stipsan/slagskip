import invariant from 'invariant'
import {
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

      dispatch({
        type: LOAD_GAME_SUCCESS,
        id: game.id,
        versus: isViewerFirst ? game.players[1] : game.players[0],
        viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
        versusBoard: isViewerFirst ? game.boards[1] : game.boards[0],
        turns: game.turns,
        gameState: 'ready',
        isViewerFirst,
        hits: []
      })
      callback(null, {
        type: LOAD_GAME_SUCCESS,
        id: game.id,
        versus: isViewerFirst ? game.players[1] : game.players[0],
        viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
        turns: game.turns,
        gameState: 'ready',
        isViewerFirst,
        isFriendFirst,
      })
    }).catch(error => {
      console.error(LOAD_GAME_FAILURE, error)
      callback(LOAD_GAME_FAILURE, error.message || error)
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
  
  const turn = { id: authToken.id, index: selectedCell, hit: hit !== 0, foundItem }
  callback(null, {
    type: FIRE_CANNON_SUCCESS,
    isViewerTurn: hit !== 0,
    incViewerScore,
    turn,
  })
  dispatch({
    type: FIRE_CANNON_SUCCESS,
    incViewerScore,
    turn,
    hit,
  })
  socket.exchange.publish(`user:${getState().getIn(['game', 'versus'])}`, {
    type: hit !== 0 ? RECEIVE_HIT : RECEIVE_MISS,
    incVersusScore: incViewerScore,
    turn,
  })
}