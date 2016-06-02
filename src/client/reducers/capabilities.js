import { Map as ImmutableMap } from 'immutable'

import {
  CHECK_CAPABILITIES
} from '../constants/ActionTypes'

const initialState = ImmutableMap({
  websocket: true,
})

export const capabilities = (state = initialState, action) => {
  switch (action.type) {
  case CHECK_CAPABILITIES:
    return state.merge({
      websocket: !!global.WebSocket,
    })
  default:
    return state
  }
}
