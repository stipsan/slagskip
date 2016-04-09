import { LOCATION_CHANGE } from 'react-router-redux'
import { Map as ImmutableMap } from 'immutable'

// state can be authenticated, pending or unauthenticated

const initialState = ImmutableMap({
  isGoingForwards: true
})

export const navigation = (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return state.set('isGoingForwards', action.payload.action === 'PUSH' && action.payload.pathname !== '/')
  default:
    return state
  }
}