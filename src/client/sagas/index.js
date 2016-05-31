import { watchAuthState, watchUserCreate } from './auth'

export default function *sagas() {
  yield [
    watchAuthState(),
  ]
}

export * from './auth'
