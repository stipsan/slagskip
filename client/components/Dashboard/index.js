import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import { Link } from 'react-router'
import style from './style.scss'
import { logoutUser } from '../../actions'

class Dashboard extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  }
  
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  
  shouldComponentUpdate = shouldComponentUpdate
  
  handleLogout = () => this.props.dispatch(logoutUser());
  
  render() {
    const { children, username, routeParams } = this.props
    const { router } = this.context
    const isFriendsTabActive = router.isActive({ pathname: 'friends' })

    return <DocumentTitle title={username ? `Epic | ${username}` : null}>
      <div className={style.dashboard}>
        <nav className={style.navbar}>
          <p className={style.placeholderItem}>
            
          </p>
          <p className={style.usernameItem}>
            {username}
          </p>
          <p className={style.logoutItem}>
            <a className={style.logoutButton} onClick={this.handleLogout}>Logout</a>
          </p>
        </nav>
        <div className={style.tabscontainer}>
          <div className={style.tabs}>
            <ul>
              <li className={classNames({
                [style.isActive]: !isFriendsTabActive
               })}><Link to="/">Games</Link></li>
              <li className={classNames({
                [style.isActive]: isFriendsTabActive
               })}><Link to="/friends">Friends</Link></li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </DocumentTitle>
  }
}

export default Dashboard