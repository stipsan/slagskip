import { watchAuthState, watchServerRequests, watchSocketEmits } from './exports'

export default function *sagas() {
  yield [
    watchAuthState(),
    watchServerRequests(),
    watchSocketEmits(),
  ]
}
