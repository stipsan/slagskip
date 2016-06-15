import { Map as ImmutableMap, OrderedMap as ImmutableOrderedMap } from 'immutable'

import {
  RECEIVE_VIEWER,
  VIEWER_SUCCESS,
  RECEIVE_NEW_GAME,
  GAMES_SUCCESS,
} from '../constants/ActionTypes'

const defaultGame = ImmutableMap({
  id: null,
})
const initialState = ImmutableMap({
  total: 0,
  list: ImmutableOrderedMap({})
})
const getIsViewerTurn = game => {

  const lastTurn = game.turns && game.turns[game.turns.length - 1]
  if (lastTurn && lastTurn.id === game.versus && true === lastTurn.hit) {
    return false
  }
  if (lastTurn && lastTurn.id === game.versus && false === lastTurn.hit) {
    return true
  }
  if (lastTurn && lastTurn.id !== game.versus && true === lastTurn.hit) {
    return true
  }
  if (lastTurn && lastTurn.id !== game.versus && true !== lastTurn.hit) {
    return false
  }

  return game.isViewerFirst
}

export const games = (state = initialState, { type, payload }) => {
  switch (type) {
  case RECEIVE_VIEWER:
  case VIEWER_SUCCESS:
    return state.set('total', payload.games.length)
  case RECEIVE_NEW_GAME:
    return state.set('total', state.get('total') + 1)
  case GAMES_SUCCESS:
    return payload.games.reduce(
      (newState, game) => newState.setIn(
        ['list', game.id],
        defaultGame.merge(game).set('isViewerTurn', getIsViewerTurn(game))
      ),
      state.set('total', payload.games.length)
    )
  default:
    return state
  }
}
