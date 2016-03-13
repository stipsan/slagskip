import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import socket from '../middleware/socket'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(thunk, socket),
    process.env.NODE_ENV !== 'production' && window.devToolsExtension ? 
      window.devToolsExtension() : 
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
  global.store = store;
}

export default store;