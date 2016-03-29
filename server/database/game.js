import invariant from 'invariant'

export const loadGame = (authToken, gameId, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  invariant(gameId, 'Invalid gameId')
  
  return redis.hgetall(`game:${gameId}`).then(({ id, state }) => {
    invariant(id, '404 Game Not Found')
    
    const [boards, players, turns] = JSON.parse(state)
    
    invariant(players.indexOf(authToken.id) !== -1, 'You are not in this game!')
    
    return {id, boards, players, turns}
  })
}

export const saveTurn = (authToken, gameId, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  invariant(gameId, 'Invalid gameId')
  
  return redis.hgetall(`game:${gameId}`).then(({ id, state }) => {
    invariant(id, '404 Game Not Found')
    
    const [boards, players, turns] = JSON.parse(state)
    
    invariant(players.indexOf(authToken.id) !== -1, 'You are not in this game!')
    
    return {id, boards, players, turns}
  })
}