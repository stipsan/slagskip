import { watchAuthState, watchUserCreate } from './auth'

export default function *sagas() {
  yield [
    watchAuthState(),
    watchUserCreate(),
  ]
}

export * from './auth'
