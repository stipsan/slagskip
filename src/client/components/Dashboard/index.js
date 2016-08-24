import './index.less'

import cx from 'classnames'
import DocumentTitle from 'react-document-title'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

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
    const isFriendsTabActive = router.isActive({ pathname: 'friends' })

    const navbarRight = <a className={cx('logoutButton')} onClick={this.handleLogout}>{'Logout'}</a>

    return (<DocumentTitle title={username ? `Epic | ${username}` : null}>
      <div className={cx('dashboard')}>
        <Navbar
          left={(
            <Link to="/" className="uk-navbar-brand tm-logo tm-logo-hover">
              <span className="tm-logo-border">
                <span className="tm-logo-border-t" />
                <span className="tm-logo-border-r" />
                <span className="tm-logo-border-b" />
                <span className="tm-logo-border-l" />
              </span>
              <img
                className="tm-logo-e"
                src="/favicons/e.svg"
              />
              <img
                className="tm-logo-p"
                src="/favicons/p.svg"
              />
              <img
                className="tm-logo-i"
                src="/favicons/i.svg"
              />
              <img
                className="tm-logo-c"
                src="/favicons/c.svg"
              />
            </Link>
          )}
          right={(
            <div className="uk-navbar-flip">
              <a href="#" onClick={this.handleLogout} className="uk-navbar-toggle" />
            </div>
          )}
        >
          {username}
        </Navbar>
        <div className={cx('tabscontainer')}>
          <div className={cx('tabs')}>
            <ul>
              <li
                className={cx({
                  isActive: !isFriendsTabActive
                })}
              ><Link to="/">{'Games'}</Link></li>
              {/* <li className={cx({
                isActive: isFriendsTabActive
              })}><Link to="/friends">Friends</Link></li>*/}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </DocumentTitle>)
  }
}

export default Dashboard
