import { Component } from 'react'

import cx from './style.scss'

export default class Title extends Component {
  render() {
    const { children } = this.props

    return <h1 className={cx('headerTitle')}>
      {children}
    </h1>
  }
}
