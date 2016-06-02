import {
  watchUserCreate,
  watchAuthenticateRequest,
  watchCheckEmailExistRequest,
  watchClientRequests,
} from './exports'

export default function *sagas(socket, database, redis) {
  yield [
    // watchAuthenticateRequest(socket, database, redis),
    watchCheckEmailExistRequest(socket, database, redis),
    watchClientRequests(socket, database, redis),
  ]
}
