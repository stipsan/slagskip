import { Component, PropTypes } from 'react'
import { replace } from 'react-router-redux'
import Disconnected from '../Disconnected'
import UnsupportedBrowser from '../UnsupportedBrowser'

function shouldCheckAuth ({
  maybeRedirectToLogin,
  connected,
  isAuthenticated,
  location: redirectAfterLogin,
} = this.props) {
  return maybeRedirectToLogin(connected, isAuthenticated, redirectAfterLogin)
}

export default class App extends Component {

  componentWillMount = shouldCheckAuth
  componentWillReceiveProps = shouldCheckAuth
  
  render() {
    const { connected, disconnnected, supportedBrowser, children } = this.props
    return <div className="page">
      {connected && supportedBrowser && children}
      {!connected && supportedBrowser && <h1></h1>/*@TODO add loading indicator*/}
      {!supportedBrowser && <h1>Unsupported browser</h1>}
    </div>
  }
}