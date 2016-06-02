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
  const games = getState().getIn(['viewer', 'games'])
  return database.getGames({
    id: authToken.id,
    games,
  }, redis)
    .then(fetchedGames => {
      const mappedGames = fetchedGames.map(game => {
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
      callback(null, { type: GAMES_SUCCESS, games: mappedGames })
    }).catch(error => {
      console.error(GAMES_FAILURE, error)
      callback(GAMES_FAILURE, error)
    })
}
