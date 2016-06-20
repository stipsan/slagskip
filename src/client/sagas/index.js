import { watchRemote, watchRequests } from 'redux-saga-sc'

import { socket } from '../services'
import {
  watchAuthState,
  watchSocketConnect,
  watchSocketEmits,
 } from './exports'

export default function *sagas() {
  yield [
    watchAuthState(),
    watchSocketConnect(),
    watchSocketEmits(),
    watchRemote(socket),
    watchRequests(socket),
  ]
}
