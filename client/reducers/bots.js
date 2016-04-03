import { fromJS } from 'immutable'

const initialState = fromJS([
  { id: "-1", username: 'Wall-E', online: '1', avatar: '/bot/walle.png' },
  { id: "-2", username: 'R2D2', online: '1', avatar: '/bot/r2d2.png' },
  { id: "-3", username: 'K-9', online: '1' },
])

export const bots = (state = initialState) => {
  return state
}