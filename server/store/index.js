import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux-immutable'
import { Map as ImmutableMap } from 'immutable'
import * as reducers from '../reducers'

const rootReducer = combineReducers(reducers)
const initialState = ImmutableMap()

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
)

export default store