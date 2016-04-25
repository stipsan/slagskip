import { fromJS } from 'immutable'

const initialState = fromJS([
  { id: '-1', username: 'Wall-E', online: '1',
    avatar: '/bot/walle.png', description: 'Lets you win' },
  { id: '-2', username: 'R2D2', online: '1',
    avatar: '/bot/r2d2.png', description: 'A bit harder to beat' },
  { id: '-3', username: 'K-9', online: '1',
    avatar: '/bot/k9.png', description: 'Sniffs out your hiding spots' },
  { id: '-4', username: 'Marvin', online: '1',
    avatar: '/bot/marvin.png', description: 'Gets depressed if he beats you' },
  { id: '-5', username: 'HAL 9000', online: '1',
    avatar: '/bot/hal.png', description: 'Makes very few mistakes' },
  { id: '-6', username: 'GLaDOS', online: '1',
    avatar: '/bot/glados.png', description: 'She\'ll give you cake if you win' },
])

export const bots = (state = initialState) => state
