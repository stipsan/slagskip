import { PropTypes } from 'react'

import cx from './style.scss'

const Navbar = ({ left, children, right }) => <header className={cx('header')}>
  <div className={cx('headerLeft')}>
    {left}
  </div>
  <div className={cx('headerCenter')}>
    {children}
  </div>
  <div className={cx('headerRight')}>
    {right}
  </div>
</header>

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
  left: PropTypes.node,
  right: PropTypes.node,
}

export default Navbar
