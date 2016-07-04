import { watchRemote, watchEmits } from 'redux-saga-sc'

import {
  watchUserCreate,
  watchAuthenticateRequest,
  watchDeauthenticateRequest,
  watchCheckEmailExistRequest,
  watchViewerLoggedIn,
  watchFriends,
  watchGames,
  watchNewGame,
  watchLoadGame,
  watchJoinGame,
  watchSaveTurn,
  watchExchange,
} from './exports'

export default function *sagas(socket, database, redis) {
  yield [
    watchUserCreate(socket, database, redis),
    watchAuthenticateRequest(socket, database, redis),
    watchDeauthenticateRequest(socket, database, redis),
    watchCheckEmailExistRequest(socket, database, redis),
    watchViewerLoggedIn(socket, database, redis),
    watchFriends(socket, database, redis),
    watchNewGame(socket, database, redis),
    watchLoadGame(socket, database, redis),
    watchJoinGame(socket, database, redis),
    watchGames(socket, database, redis),
    watchSaveTurn(socket, database, redis),
    watchRemote(socket),
    watchEmits(socket),
    watchExchange(socket),
  ]
}
