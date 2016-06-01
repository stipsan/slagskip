import {
  watchUserCreate,
  watchAuthenticateRequest,
  watchCheckEmailExistRequest,
} from './auth'
import {
  watchClientRequests,
} from './socket'

export default function *sagas(socket, database, redis) {
  yield [
    // watchAuthenticateRequest(socket, database, redis),
    watchCheckEmailExistRequest(socket, database, redis),
    watchClientRequests(socket, database, redis),
  ]
}
