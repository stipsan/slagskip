import { Component, PropTypes } from 'react'
import { replace } from 'react-router-redux'
import Disconnected from '../../containers/Disconnected'
import UnsupportedBrowser from '../../containers/UnsupportedBrowser'
import Loading from '../Loading'

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

  static propTypes = {
    connected: PropTypes.bool.isRequired,
    disconnected: PropTypes.bool.isRequired,
    supportedBrowser: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
  }
  
  render() {
    const { connected, disconnected, supportedBrowser, children } = this.props
    return <div className="page">
      {connected && supportedBrowser && children || <Loading />}
      {disconnected && <Disconnected />}
      {!supportedBrowser && <UnsupportedBrowser />}
    </div>
  }
}