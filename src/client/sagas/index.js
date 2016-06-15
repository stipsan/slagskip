import {
  watchAuthState,
  watchServerRequests,
  watchSocketConnect,
  watchSocketEmits,
  watchViewerRequests,
 } from './exports'

export default function *sagas() {
  yield [
    watchAuthState(),
    watchServerRequests(),
    watchSocketConnect(),
    watchSocketEmits(),
    watchViewerRequests(),
  ]
}
