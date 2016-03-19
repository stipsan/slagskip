import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import socket from '../middleware/socket'
import rootReducer from '../reducers'

const routerMiddlewareWithHistory = routerMiddleware(browserHistory)

const store = createStore(
  rootReducer,
  undefined,
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

if(process.env.NODE_ENV !== 'production') {
  global.store = store
}

export default store