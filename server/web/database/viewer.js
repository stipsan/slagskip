import invariant from 'invariant'

export const getViewer = (authToken, redis) => {
  invariant(authToken.id, 'Invalid authToken, missing `id` property')
  
  const viewerId = authToken.id
  
  return redis
    .multi([
      ['hgetall', 'users'],
      ['smembers', `user:${viewerId}:invites`],
      ['hset', `user:${viewerId}`, 'online', 1],
    ])
    .exec()
    .then(results => {
      const friends  = results[0][1]
      const invites  = results[1][1]
      
      // @FIXME
      friends.splice(friends.indexOf(viewerId), 1)
      
      return { friends, invites }
    })
}

function fetchUser(id, data, success, failure) {
  redis.multi([
    ['hgetall', 'users'],
    ['smembers', `user:${id}:invites`],
    ['smembers', `user:${id}:requests`],
    ['hset', `user:${id}`, 'online', 1],
  ]).exec((err, results) => {
    // @TODO investigate if error handling is correct here
    if(err) return failure(err)

    const users    = results[0][1]
    const invites  = results[1][1]
    const requests = results[2][1]

    // exclude our own user from the friends list
    delete users[data.username]

    const hgetallFriends = Object.keys(users).reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        ['hgetall', `user:${users[currentValue]}`],
      ], [])
    //console.log('hgetallFriends', hgetallFriends);
    redis.multi(hgetallFriends).exec((err, hgetallFriendsResults) => {
      // @TODO investigate if error handling is correct here
      if(err) return failure(err)
      
      const friends = hgetallFriendsResults.reduce(
        (previousValue, currentValue, index) => [
          ...previousValue,
          Object.assign(currentValue[1], {id: users[index]}),
        ], [])
      //console.log('hgetallFriends.multi', friends);
      
      success({
        username: data.username,
        id,
        friends,
        invites,
        requests,
        online: true,
      })
    })
  })
}