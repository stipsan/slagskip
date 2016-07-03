import { connect } from 'react-redux'

import App from '../components/App'
import {
  CHECK_CAPABILITIES,
  SOCKET_REQUESTED,
} from '../constants/ActionTypes'

const mapStateToProps = state => ({
  connected: state.get('connected'),
  disconnected: state.get('disconnected'),
  supportedBrowser: state.getIn(['capabilities', 'websocket']),
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isViewerLoaded: state.getIn(['viewer', 'isLoaded']),
  isGoingForwards: state.getIn(['navigation', 'isGoingForwards']),
})

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch({ type: CHECK_CAPABILITIES })
    dispatch({ type: SOCKET_REQUESTED })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
