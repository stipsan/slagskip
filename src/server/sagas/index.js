import { watchUserCreate } from './auth.js'

export default function *sagas(...args) {
  yield [
    watchUserCreate(...args),
  ]
}
