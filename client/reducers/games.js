import {
  RECEIVE_VIEWER,
  RECEIVE_NEW_GAME,
  GAMES_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap, OrderedMap as ImmutableOrderedMap } from 'immutable'


const defaultGame = ImmutableMap({
  id: null,
})
const initialState = ImmutableMap({
  total: 0,
  list: ImmutableOrderedMap({})
})
const getIsViewerTurn = game => {
  
  const lastTurn = game.turns && game.turns[game.turns.length - 1]
  if(lastTurn && lastTurn.id === game.versus && lastTurn.hit === true) {
    return false
  }
  if(lastTurn && lastTurn.id === game.versus && lastTurn.hit === false) {
    return true
  }
  if(lastTurn && lastTurn.id !== game.versus && lastTurn.hit === true) {
    return true
  }
  if(lastTurn && lastTurn.id !== game.versus && lastTurn.hit !== true) {
    return false
  }
  
  return game.isViewerFirst
}

const mapGameToState = game => defaultGame.merge(game)

export const games = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_VIEWER:
    return state.set('total', action.games.length)
  case RECEIVE_NEW_GAME:
      return state.set('total', state.get('total') + 1)
  case GAMES_SUCCESS:
    return action.games.reduce(
      (state, game) => state.setIn(['list', game.id], defaultGame.merge(game).set('isViewerTurn', getIsViewerTurn(game))),
      state.set('total', action.games.length)
    )
  default:
    return state
  }
}