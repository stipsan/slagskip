import invariant from 'invariant'

export const newGame = (authToken, versusId, board, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  invariant(versusId, 'Invalid versusId')
  invariant(board, 'Invalid board')

  let newGameId

  return redis.incr('game_next').then(gameId => {
    invariant(gameId, 'Failed to get game_next id')

    newGameId = gameId

    return redis.multi([
      ['hmset', `game:${gameId}`, {
        id: gameId,
        state: JSON.stringify([
          [authToken.id, versusId],
          [board.grid]
        ])
      }],
      ['sadd', `games:${authToken.id}`, gameId],
      ['sadd', `games:${versusId}`, gameId],
      ['expire', `game:${gameId}`, 72 * 60 * 60],
    ]).exec()
  }).then(() => newGameId)
}

export const loadGame = (authToken, gameId, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  invariant(gameId, 'Invalid gameId when loading game')

  return redis.hgetall(`game:${gameId}`).then(({ id, state }) => {
    invariant(id, '404 Game Not Found')

    const [players, boards, turns, scores = [0, 0]] = JSON.parse(state)

    invariant(-1 !== players.indexOf(authToken.id), 'You are not in this game!')

    return { id, boards, players, turns, scores }
  })
}

export const joinGame = (authToken, gameId, board, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property when joining game')
  invariant(gameId, 'Invalid gameId when joining game')

  return redis.hgetall(`game:${gameId}`)
    .then(({ id, state }) => {
      invariant(id, '404 Game Not Found')

      const [players = [], boards = [], turns = []] = JSON.parse(state)

      invariant(-1 !== players.indexOf(authToken.id), 'You are not in this game!')

      boards[1] = board.grid

      // @TODO move to multi block
      redis.expire(`game:${gameId}`, 72 * 60 * 60)

      return redis.hset(`game:${gameId}`, 'state', JSON.stringify([players, boards, turns]))
    })
    .then(() => redis.hgetall(`game:${gameId}`))
    .then(({ id, state }) => {
      invariant(id, '404 Game Not Found')

      const [players, boards, turns, scores = [0, 0]] = JSON.parse(state)

      return { id, boards, players, turns, scores }
    })
}

export const saveTurn = (authToken, gameId, turn, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  invariant(gameId, 'Invalid gameId when saving turn %s', gameId)
  invariant(turn, 'Invalid turn')

  return redis.hgetall(`game:${gameId}`).then(({ id, state }) => {
    invariant(id, '404 Game Not Found')

    const [players, boards, turns] = JSON.parse(state)

    invariant(-1 !== players.indexOf(authToken.id), 'You are not in this game!')

    turns.push(turn)

    const scoresSets = turns.reduce((previousScores, current) => {
      // Versus opponent moves
      if (current.id === players[0] && current.hit) {
        previousScores[0].add(current.index)
      } else if (turn.id === players[1] && current.hit) {
        previousScores[1].add(current.index)
      }

      return previousScores
    }, [new Set(), new Set()])
    const scores = [scoresSets[0].size, scoresSets[1].size]

    // @TODO move to multi block
    redis.expire(`game:${gameId}`, 72 * 60 * 60)

    return redis.hset(`game:${gameId}`, 'state', JSON.stringify([players, boards, turns, scores]))
  })
  .then(() => redis.hgetall(`game:${gameId}`))
  .then(({ id, state }) => {
    invariant(id, '404 Game Not Found')

    const [players, boards, turns, scores] = JSON.parse(state)

    return { id, boards, players, turns, scores }
  })
}
