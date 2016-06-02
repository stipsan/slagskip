import { watchAuthState, watchUserCreate, watchSocket, watchServerRequests } from './exports'

export default function *sagas() {
  yield [
    // watchSocket(),
    watchAuthState(),
    watchServerRequests(),
  ]
}
