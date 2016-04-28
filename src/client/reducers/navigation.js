import { Map as ImmutableMap } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = ImmutableMap({
  isGoingForwards: true
})

export const navigation = (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return state.set(
      'isGoingForwards',
      'PUSH' === action.payload.action && '/' !== action.payload.pathname
    )
  default:
    return state
  }
}
