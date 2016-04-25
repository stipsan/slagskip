import * as reducers from '../reducers'

import thunk from 'redux-thunk'
import { Map as ImmutableMap } from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'

export default () => createStore(
  combineReducers(reducers),
  ImmutableMap(),
  applyMiddleware(thunk)
)
