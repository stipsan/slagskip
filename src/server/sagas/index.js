import {
  watchUserCreate,
  watchAuthenticateRequest,
  watchCheckEmailExistRequest,
  watchClientRequests,
  watchViewerLoggedIn,
} from './exports'

export default function *sagas(socket, database, redis) {
  yield [
    watchUserCreate(socket, database, redis),
    watchAuthenticateRequest(socket, database, redis),
    watchCheckEmailExistRequest(socket, database, redis),
    watchClientRequests(socket, database, redis),
    watchViewerLoggedIn(socket, database, redis),
  ]
}
