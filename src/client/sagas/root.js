import { watchAuthState, watchUserCreate, watchSocket } from './index'

export default function *sagas() {
  yield [
    watchSocket(),
    watchAuthState(),
  ]
}
