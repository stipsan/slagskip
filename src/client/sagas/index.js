import {
  watchAuthState,
  watchServerRequests,
  watchSocketConnect,
  watchSocketEmits,
 } from './exports'

export default function *sagas() {
  yield [
    watchAuthState(),
    watchServerRequests(),
    watchSocketConnect(),
    watchSocketEmits(),
  ]
}
