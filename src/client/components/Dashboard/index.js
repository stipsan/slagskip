import './index.less'

import cx from 'classnames'
import DocumentTitle from 'react-document-title'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import { Modal } from 'uikit-react'

import Navbar from '../Navbar'
import { logoutUser } from '../../actions'

class OpenModal extends Component {

  render() {
    return <a onClick={this.props.onClick} className="uk-navbar-toggle" />
  }
}

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
    const { modalTarget, handleLogout } = this
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
              <Modal target={<OpenModal />}>
                <ul className="uk-nav uk-nav-side">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                  <li className="uk-nav-divider" />
                  <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </Modal>
            </div>
          )}
        >
          {username}
        </Navbar>
        <div>{children}</div>
      </div>
    </DocumentTitle>)
  }
}

export default Dashboard
