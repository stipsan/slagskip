import { watchAuthState, watchUserCreate, watchSocket, watchServerRequests } from './index'

export default function *sagas() {
  yield [
    // watchSocket(),
    watchAuthState(),
    watchServerRequests(),
  ]
}
