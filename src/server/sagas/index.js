import { watchUserCreate } from './auth.js'

export default function *sagas() {
  console.log(...arguments)
  yield [
    watchUserCreate(),
  ]
}
