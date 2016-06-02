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
      const nextValue = currentValue
      const mutatedPreviousValue = previousValue
      if (0 === currentIndex % 2) {
        nextValue[1].inviteIn = -1 !== viewer.invites.indexOf(nextValue[1].id)
        mutatedPreviousValue[i++] = nextValue[1]
      } else {
        mutatedPreviousValue[i - 1].inviteOut = !!currentValue[1]
      }
      return mutatedPreviousValue
    }, []
    )
  })
}
