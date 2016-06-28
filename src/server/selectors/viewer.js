export const getFriendIds = state => {
  console.log('getFriendIds', state)
  return state.getIn(['viewer', 'friendIds'])
}
export const getInvites = state => state.getIn(['viewer', 'invites'])
