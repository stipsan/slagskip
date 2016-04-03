import { fromJS } from 'immutable'

const initialState = fromJS([
  { id: "-1", username: 'Wall-E', online: '1', avatar: '/bot/walle.png' },
  { id: "-2", username: 'R2D2', online: '1', avatar: '/bot/r2d2.png' },
])

export const bots = (state = initialState) => {
  return state
}