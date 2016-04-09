import invariant from 'invariant'

export const getGames = (viewer, redis) => {
  invariant(viewer.id, 'Invalid viewer, missing `id` property')
  invariant(viewer.games, 'Invalid viewer, missing `games` property')
  
  const viewerId = viewer.id
  const pipeline = viewer.games.reduce(
    (previousValue, currentValue) => [
      ...previousValue,
      ['hgetall', `game:${currentValue}`],
    ],
    []
  )
  return redis.multi(pipeline).exec().then(results => {
    let i = 0
    return results.reduce((previousValue, currentValue, currentIndex) => {
        const game = currentValue[1]
        if(!game.state) return previousValue
        try {
          const [players, boards, turns = [], scores = [0,0]] = JSON.parse(game.state)
          previousValue[i++] = {
            id: currentValue[1].id,
            players,
            boards,
            turns,
            scores,
          }
        } catch(e) {
          console.error('failed to decode state', e)
        }
        return previousValue
      }, []
    )
  })
}