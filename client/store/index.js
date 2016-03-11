import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(thunk),
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

global.store = store;

export default store;