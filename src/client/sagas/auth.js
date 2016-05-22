import { socket } from '../services'

export function *watchAuthState() {
  console.log('Hello Sagas!', socket) // eslint-disable-line
}

export function *watchUserCreate() {
  console.log('Watching user signup', socket) // eslint-disable-line
}
