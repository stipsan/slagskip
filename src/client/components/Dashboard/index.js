import DocumentTitle from 'react-document-title'
import Push from 'push.js'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import Navbar from '../Navbar'
import { logoutUser } from '../../actions'

class Dashboard extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    username: PropTypes.string,
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleLogout = () => this.props.dispatch(logoutUser());

  render() {
    const { children, username } = this.props
    const { router } = this.context
    const isSettingsTabActive = router.isActive({ pathname: 'settings' })

    const navbarRight = <a className={cx('logoutButton')} onClick={this.handleLogout}>{'Logout'}</a>

    return (<DocumentTitle title={username ? `Epic | ${username}` : null}>
      <div className={cx('dashboard')}>
        <Navbar right={navbarRight}>
          {username}
        </Navbar>
        <div className={cx('tabscontainer')}>
          <div className={cx('tabs')}>
            <ul>
              <li
                className={cx({
                  isActive: !isSettingsTabActive
                })}
              ><Link to="/">{'Games'}</Link></li>
              <li
                className={cx({
                  isActive: isSettingsTabActive
                })}
              ><Link to="/settings">{'Settings'}</Link></li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </DocumentTitle>)
  }
}

export default Dashboard
