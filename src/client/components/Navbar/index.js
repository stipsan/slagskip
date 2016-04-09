import { Component } from 'react'
import cx from './style.scss'

export default class Navbar extends Component {
  render() {
    const { left, children, right } = this.props
    
    return <header className={cx('header')}>
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
  }
}