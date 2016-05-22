import invariant from 'invariant'

export const getViewer = (authToken, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')

  const viewerId = authToken.id

  return redis
    .multi([
      ['hvals', 'emails'],
      ['smembers', `user:${viewerId}:invites`],
      ['smembers', `games:${viewerId}`],
      ['hset', `user:${viewerId}`, 'online', 1],
    ])
    .exec()
    .then(results => {
      const friendIds = results[0][1]
      const invites = results[1][1]
      const games = results[2][1]

      // @FIXME
      friendIds.splice(friendIds.indexOf(viewerId), 1)

      return { friendIds, invites, games }
    })
}

export const setViewerOffline = (viewerAuthToken, lastVisit, redis) => {
  invariant(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property')
  invariant(lastVisit, 'Invalid `lastVisit` argument')

  return redis
    .hmset(
      `user:${viewerAuthToken.id}`,
      'online', 0,
      'lastVisit', lastVisit
    )
    .then(result => {
      invariant('OK' === result, 'Failed to set user offline status')

      return {
        id: viewerAuthToken.id,
        online: '0',
        lastVisit
      }
    })
}
