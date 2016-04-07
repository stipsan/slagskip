import { Component } from 'react'
import { Link } from 'react-router'
import cx from './style.scss'

class Navbar extends Component {
  render() {
    const { viewer, versus } = this.props
    
    return <div className={cx('navbar')}>
      <Link to="/" className={cx('backLink')}>❮ Back</Link>
      <div className={cx('navbarTitle')}>{viewer && viewer.get('username')} vs. {versus && versus.get('username')}</div>
    </div>
  }
}

export default Navbar