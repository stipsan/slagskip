import { Map as ImmutableMap } from 'immutable'
import {
  LOCATION_CHANGE
} from 'react-router-redux'

const initialState = ImmutableMap({
  locationBeforeTransitions: null
})

export const routing = (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return state.merge({
      locationBeforeTransitions: action.payload
    })
  default:
    return state
  }
}