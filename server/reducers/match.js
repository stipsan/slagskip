import {
  AUTHENTICATE_SUCCESS,
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

const initialState = ImmutableMap({
  matchState: [],
  list: []
})

export const match = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state
  }
}