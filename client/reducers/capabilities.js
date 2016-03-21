import {
  CHECK_CAPABILITIES
} from '../constants/ActionTypes'
import { Map as ImmutableMap } from 'immutable'

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