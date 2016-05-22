import * as reducers from '../reducers'

import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { Map as ImmutableMap } from 'immutable'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'

import sagas from '../sagas'
import socket from '../middleware/socket'

const routerMiddlewareWithHistory = routerMiddleware(browserHistory)

const rootReducer = combineReducers(reducers)
const initialState = ImmutableMap()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware, thunk, socket, routerMiddlewareWithHistory),
    'production' !== process.env.NODE_ENV && global.devToolsExtension ?
      global.devToolsExtension() :
      f => f
  )
)

sagaMiddleware.run(sagas)

if ('production' !== process.env.NODE_ENV && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    /* eslint global-require: ["off"] */
    const nextRootReducer = require('../reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
