import invariant from 'invariant'

export const getFriends = (viewer, redis) => {
  invariant(viewer.id, 'Invalid viewer, missing `id` property')
  invariant(viewer.friends, 'Invalid viewer, missing `friends` property')
  invariant(viewer.invites, 'Invalid viewer, missing `invites` property')

  const viewerId = viewer.id
  const pipeline = viewer.friends.reduce(
    (previousValue, currentValue) => [
      ...previousValue,
      ['hgetall', `user:${currentValue}`],
      ['sismember', `user:${currentValue}:invites`, viewerId],
    ],
    []
  )
  return redis.multi(pipeline).exec().then(results => {
    let i = 0
    return results.reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex % 2 === 0) {
        currentValue[1].inviteIn = viewer.invites.indexOf(currentValue[1].id) !== -1
        previousValue[i++] = currentValue[1]
      } else {
        previousValue[i - 1].inviteOut = !!currentValue[1]
      }
      return previousValue
    }, []
    )
  })
}
