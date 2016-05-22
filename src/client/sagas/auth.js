import { socket } from '../services'

export function *watchAuthState() {
  console.log('Hello Sagas!', socket) // eslint-disable-line
}
