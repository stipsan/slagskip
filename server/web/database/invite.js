import invariant from 'invariant'

export const viewerSendsInvite = (viewerAuthToken, friendId, redis) => {
  invariant(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property')
  invariant(friendId, 'Invalid `friendId` argument')
  
  return redis
    .sadd(`user:${friendId}:invites`, viewerAuthToken.id)
    .then(didSendInvite => {
      invariant(didSendInvite, 'Failed to send invite')
      
      return {
        id: friendId,
        inviteOut: true
      }
    })
}

function userInviteFriend(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.sadd(`user:${id}:requests`, data.friend.username)
    redis.expire(`user:${id}:requests`, INVITE_EXPIRE)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.sadd(`user:${id}:invites`, data.user.username)
      redis.expire(`user:${id}:invites`, INVITE_EXPIRE)
      success(id)
    })
  })
}

function userAcceptInvite(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.sadd(`user:${id}:requests`, data.friend.username)
    redis.expire(`user:${id}:requests`, INVITE_EXPIRE)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.sadd(`user:${id}:invites`, data.user.username)
      redis.expire(`user:${id}:invites`, INVITE_EXPIRE)
      success(id)
    })
  })
}

function userCancelInvite(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.srem(`user:${id}:requests`, data.friend.username)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.srem(`user:${id}:invites`, data.user.username)
      success(id)
    })
  })
}

function userDeclineInvite(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.srem(`user:${id}:invites`, data.friend.username)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.srem(`user:${id}:requests`, data.user.username)
      success(id)
    })
  })
}