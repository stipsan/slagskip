import { connect } from 'react-redux'
import { redirectToLogin } from '../actions'
import App from '../components/App'

export default connect(
  state => {
    return {
      connected: state.connected,
      disconnected: state.disconnected,
      supportedBrowser: state.capabilities.websocket,
      isAuthenticated: state.auth.isAuthenticated,
    }
  },
  dispatch => ({
    maybeRedirectToLogin: (connected, isAuthenticated, { pathname, ...redirectAfterLogin }) => {
      if (connected && !isAuthenticated && pathname !== '/login') {
        dispatch(redirectToLogin({ pathname, ...redirectAfterLogin }))
      }
    },
  }),
)(App)