import { Component, PropTypes } from 'react'
import Disconnected from '../../containers/Disconnected'
import Login from '../../containers/Login'
import UnsupportedBrowser from '../../containers/UnsupportedBrowser'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
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
  
  shouldComponentUpdate = shouldComponentUpdate
  
  render() {
    const {
      connected,
      disconnected,
      supportedBrowser,
      isAuthenticated,
      isViewerLoaded,
      children
    } = this.props
    
    const shouldMountChildren = connected && supportedBrowser && isAuthenticated && isViewerLoaded
    const shouldOverlayLogin  = connected && supportedBrowser && !isAuthenticated
    const isCurrentlyLoading  = supportedBrowser && isAuthenticated && (!connected || !isViewerLoaded)

    return <ReactCSSTransitionGroup component="div" transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration / 2} transitionAppearTimeout={transitionDuration}>
      {shouldMountChildren && <div key={children.props.route.path}>{children}</div>}
      {shouldOverlayLogin && <Login />}
      {isCurrentlyLoading && <Loading />}
      {disconnected && <Disconnected />}
      {!supportedBrowser && <UnsupportedBrowser />}
    </ReactCSSTransitionGroup>
  }
}