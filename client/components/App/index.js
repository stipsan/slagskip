import { Component, PropTypes } from 'react'
import Disconnected from '../../containers/Disconnected'
import Login from '../../containers/Login'
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

export default class App extends Component {

  static propTypes = {
    connected: PropTypes.bool.isRequired,
    disconnected: PropTypes.bool.isRequired,
    supportedBrowser: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
  }
  
  render() {
    const { connected, disconnected, supportedBrowser, isAuthenticated, children } = this.props
    return <ReactCSSTransitionGroup component="div" transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration / 2} transitionAppearTimeout={transitionDuration}>
      {connected && supportedBrowser && isAuthenticated && <div key={children.props.route.path}>{children}</div>}
      {connected && supportedBrowser && !isAuthenticated && <Login />}
      {!connected && supportedBrowser && <Loading />}
      {disconnected && <Disconnected />}
      {!supportedBrowser && <UnsupportedBrowser />}
    </ReactCSSTransitionGroup>
  }
}