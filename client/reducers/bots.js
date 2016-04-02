import { fromJS } from 'immutable'

const initialState = fromJS([
  { id: "-1", username: 'Wall-E', online: '1' }
])

export const bots = (state = initialState) => {
  return state
}