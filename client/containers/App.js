import { connect } from 'react-redux'
import { redirectToLogin } from '../actions'
import App from '../components/App'

export default connect(
  state => {
    return {
      connected: state.get('connected'),
      disconnected: state.get('disconnected'),
      supportedBrowser: state.getIn(['capabilities', 'websocket']),
      isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    }
  }
)(App)