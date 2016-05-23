import * as reducers from '../reducers'

import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { Map as ImmutableMap } from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'

import sagas from '../sagas'

export default (socket, database, redis) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers(reducers),
    ImmutableMap(),
    applyMiddleware(thunk, sagaMiddleware)
  )

  sagaMiddleware.run(sagas, socket, database, redis)

  return store
}
