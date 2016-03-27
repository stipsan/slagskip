import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux-immutable'
import { Map as ImmutableMap } from 'immutable'
import * as reducers from '../reducers'

export default () => createStore(
  combineReducers(reducers),
  ImmutableMap(),
  applyMiddleware(thunk)
)