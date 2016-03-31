import invariant from 'invariant'
import {
  GAMES_SUCCESS,
  GAMES_FAILURE,
} from '../constants/ActionTypes'

export const gamesRequest = (
  action,
  callback,
  socket,
  database,
  redis
) => (dispatch, getState) => {
  const authToken = socket.getAuthToken()
  const games     = getState().getIn(['viewer', 'games'])
  return database.getGames({
      id: authToken.id,
      games,
    }, redis)
    .then(fetchedGames => {
      const games = fetchedGames.map(game => {
        const isViewerFirst = game.players[0] === authToken.id
        const isFriendFirst = game.players[1] === authToken.id

        let gameState = isViewerFirst ? 
          (game.boards.length > 1 ? 'ready' : 'waiting') :
          (game.boards.length > 1 ? 'ready' : 'setup')

        if(game.scores.indexOf(21) !== -1) {
          if(isViewerFirst) {
            gameState = game.scores[0] === 21 ? 'victory' : 'defeat'
          } else {
            gameState = game.scores[1] === 21 ? 'victory' : 'defeat'
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
      callback(null, { type: GAMES_SUCCESS, games })
    }).catch(error => {
      console.error(GAMES_FAILURE, error)
      callback(GAMES_FAILURE, error)
    })
}