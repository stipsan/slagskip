import * as reducers from '../reducers'

import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import { Map as ImmutableMap } from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'

import sagas from '../sagas'

export default (socket, database, redis) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(thunk, sagaMiddleware)
  const enhancer = 'production' !== process.env.NODE_ENV ?
    compose(middleware, devTools()) : middleware
  const store = createStore(
    combineReducers(reducers),
    ImmutableMap(),
    enhancer
  )

  sagaMiddleware.run(sagas, socket, database, redis)

  return store
}
