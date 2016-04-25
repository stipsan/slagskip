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
  children: PropTypes.element.isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
}

export default Navbar
