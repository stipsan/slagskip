import { watchUserCreate, watchAuthenticateRequest } from './auth.js'

export default function *sagas(...args) {
  yield [
    watchUserCreate(...args),
    watchAuthenticateRequest(...args),
  ]
}
