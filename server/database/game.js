import invariant from 'invariant'

export const loadGame = (authToken, gameId, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  invariant(gameId, 'Invalid gameId')
  
  const tempGames = {
    1: {
      id: gameId,
      players: ['1', '2'],
      boards: [
        [
          0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 3, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 3, 0, 0, 2, 0,
          4, 4, 4, 0, 0, 0, 0, 0, 2, 0,
          5, 5, 0, 1, 1, 1, 1, 1, 2, 0,
          6, 6, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          8, 0, 0, 0, 0, 7, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 4, 4, 4,
          0, 0, 0, 0, 0, 7, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 6, 6, 0, 8, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          0, 0, 0, 0, 0, 0, 0, 2, 0, 1,
          0, 0, 0, 0, 0, 3, 0, 2, 0, 1,
          0, 5, 0, 0, 0, 3, 0, 2, 0, 1,
          0, 5, 0, 0, 0, 3, 0, 2, 0, 1,
        ]
      ],
      turns: [],
    }
  }
  
  return new Promise((resolve, reject) => {
    const game = tempGames[gameId]
    invariant(game, '404 Game Not Found')
    
    if(game.players.indexOf(authToken.id) === -1) {
      reject('You are not in this game!')
    } else {
      resolve(game)
    }
  })
}