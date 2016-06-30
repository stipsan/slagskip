export const getFriendIds = state => {
  return state.getIn(['viewer', 'friendIds'])
}
export const getGameIds = state => {
  return state.getIn(['viewer', 'games'])
}
export const getInvites = state => state.getIn(['viewer', 'invites'])
