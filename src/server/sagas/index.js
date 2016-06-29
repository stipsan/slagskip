import { watchRemote, watchEmits } from 'redux-saga-sc'

import {
  watchUserCreate,
  watchAuthenticateRequest,
  watchCheckEmailExistRequest,
  watchViewerLoggedIn,
  watchFriends,
  watchNewGame,
  watchExchange,
} from './exports'

export default function *sagas(socket, database, redis) {
  yield [
    watchUserCreate(socket, database, redis),
    watchAuthenticateRequest(socket, database, redis),
    watchCheckEmailExistRequest(socket, database, redis),
    watchViewerLoggedIn(socket, database, redis),
    watchFriends(socket, database, redis),
    watchNewGame(socket, database, redis),
    watchRemote(socket),
    watchEmits(socket),
    watchExchange(socket),
  ]
}
