import { watchRemote, watchRequests, watchEmits } from 'redux-saga-sc'

import { socket } from '../services'
import {
  watchAuthState,
  watchSocketConnect,
  watchSocketEmits,
  watchGame,
 } from './exports'

export default function *sagas() {
  yield [
    watchRemote(socket),
    watchRequests(socket),
    watchEmits(socket),
    watchAuthState(),
    watchSocketConnect(),
    watchSocketEmits(),
    watchGame(),
  ]
}
