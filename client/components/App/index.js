import { Component, PropTypes } from 'react'
import Disconnected from '../../containers/Disconnected'
import UnsupportedBrowser from '../../containers/UnsupportedBrowser'
import Loading from '../Loading'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  enter,
  enterActive,
  leave,
  leaveActive,
  appear,
  appearActive,
} from './style.scss'

const transitionName = Object.freeze({
  enter,
  enterActive,
  leave,
  leaveActive,
  appear,
  appearActive,
})
const transitionDuration = 300

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
    return <ReactCSSTransitionGroup component="div" transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration / 2} transitionAppearTimeout={transitionDuration}>
      {connected && supportedBrowser && <div key={children.props.route.path}>{children}</div>}
      {!connected && supportedBrowser && <Loading />}
      {disconnected && <Disconnected />}
      {!supportedBrowser && <UnsupportedBrowser />}
    </ReactCSSTransitionGroup>
  }
}