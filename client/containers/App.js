import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkAuth } from '../actions'
import { replace } from 'react-router-redux'
import Disconnected from '../components/Disconnected'
import UnsupportedBrowser from '../components/UnsupportedBrowser'

class App extends Component {

  componentWillReceiveProps (nextProps) {
    const {
      connected,
      checkAuth: callCheckAuth,
      isAuthenticated,
      dispatch,
      location: redirectAfterLogin
    } = nextProps
    
    if(connected) {
      checkAuth(isAuthenticated, redirectAfterLogin)
    }
  }
  
  render() {
    const { connected, disconnnected, supportedBrowser, children } = this.props
    return <div className="page">
      {connected && supportedBrowser && children}
      {!connected && supportedBrowser && <h1></h1>/*@TODO add loading indicator*/}
      {!supportedBrowser && <h1>Unsupported browser</h1>}
    </div>
  }
}

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
    checkAuth,
  }),
)(App)