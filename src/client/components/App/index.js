import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from './style.scss'
import Disconnected from '../../containers/Disconnected'
import Loading from '../Loading'
import Login from '../../containers/Login'
import UnsupportedBrowser from '../../containers/UnsupportedBrowser'

const transitionName = {
  enter: cx('enter'),
  enterActive: cx('enterActive'),
  leave: cx('leave'),
  leaveActive: cx('leaveActive'),
  appear: cx('appear'),
  appearActive: cx('appearActive'),
}
const transitionDuration = 150

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    connected: PropTypes.bool.isRequired,
    disconnected: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isGoingForwards: PropTypes.bool.isRequired,
    isViewerLoaded: PropTypes.bool.isRequired,
    supportedBrowser: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const {
      connected,
      disconnected,
      supportedBrowser,
      isAuthenticated,
      isViewerLoaded,
      isGoingForwards,
      children
    } = this.props

    const shouldMountChildren = connected && supportedBrowser && isAuthenticated && isViewerLoaded
    const shouldOverlayLogin = connected && supportedBrowser && !isAuthenticated
    const isCurrentlyLoading = supportedBrowser && isAuthenticated
                            && (!connected || !isViewerLoaded)


    return <ReactCSSTransitionGroup
      component="div"
      className={cx({ transitionBackwards: !isGoingForwards })}
      transitionName={transitionName}
      transitionEnterTimeout={transitionDuration}
      transitionLeaveTimeout={transitionDuration}
      transitionAppearTimeout={transitionDuration}
    >
      {shouldMountChildren && <div key={children.props.route.path}>{children}</div>}
      {shouldOverlayLogin && <Login />}
      {isCurrentlyLoading && <Loading />}
      {!connected && disconnected && <Disconnected />}
      {!supportedBrowser && <UnsupportedBrowser />}
    </ReactCSSTransitionGroup>
  }
}
