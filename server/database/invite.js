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

export const viewerCancelsInvite = (viewerAuthToken, friendId, redis) => {
  invariant(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property')
  invariant(friendId, 'Invalid `friendId` argument')
  
  return redis
    .srem(`user:${friendId}:invites`, viewerAuthToken.id)
    .then(didCancelInvite => {
      invariant(didCancelInvite, 'Failed to cancel invite')
      
      return {
        id: friendId,
        inviteOut: false
      }
    })
}
export const viewerAcceptsInvite = (viewerAuthToken, friendId, redis) => {
  invariant(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property')
  invariant(friendId, 'Invalid `friendId` argument')
  
  return redis
    .sadd(`user:${friendId}:invites`, viewerAuthToken.id)
    .then(didAcceptInvite => {
      invariant(didAcceptInvite, 'Failed to accept invite')
      
      return {
        id: friendId,
        inviteOut: true
      }
    })
}
export const viewerDeclinesInvite = (viewerAuthToken, friendId, redis) => {
  invariant(viewerAuthToken.id, 'Invalid viewerAuthToken, missing `id` property')
  invariant(friendId, 'Invalid `friendId` argument')
  
  return redis
    .srem(`user:${viewerAuthToken.id}:invites`, friendId)
    .then(didDeclineInvite => {
      invariant(didDeclineInvite, 'Failed to decline invite')
      
      return {
        id: friendId,
        inviteIn: false
      }
    })
}