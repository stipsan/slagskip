import {
  watchUserCreate,
  watchAuthenticateRequest,
  watchCheckEmailExistRequest,
} from './auth.js'

export default function *sagas(...args) {
  yield [
    // watchAuthenticateRequest(...args),
    watchCheckEmailExistRequest(...args),
  ]
}
