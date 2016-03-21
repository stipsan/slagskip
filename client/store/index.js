import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { combineReducers } from 'redux-immutable'
import { Map as ImmutableMap } from 'immutable'
import socket from '../middleware/socket'
import * as reducers from '../reducers'

console.log('reducers', reducers)

const routerMiddlewareWithHistory = routerMiddleware(browserHistory)

const rootReducer = combineReducers(reducers)
const initialState = ImmutableMap()

console.log('initialState', initialState)
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, socket, routerMiddlewareWithHistory),
    process.env.NODE_ENV !== 'production' && global.devToolsExtension ? 
      global.devToolsExtension() : 
      f => f
  )
)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

if ('development' === process.env.NODE_ENV && global.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  require.ensure([], function(){
    var installDevTools = require('immutable-devtools').default;
    installDevTools(require('immutable'));
  });
}

if(process.env.NODE_ENV !== 'production') {
  global.store = store
}

export default store