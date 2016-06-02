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
    // @SIDE-EFFECT history.listen is too much noise
    if ('ga' in global) {
      global.ga('set', 'page', action.payload.pathname)
      global.ga('send', 'pageview')
    }
    if ('Raygun' in global) {
      global.Raygun.trackEvent('pageView', { path: action.payload.pathname })
    }

    return state.merge({
      locationBeforeTransitions: action.payload
    })
  default:
    return state
  }
}
