import { Component } from 'react'
import cx from '../style.scss'

export class XL extends Component {
  render() {
    const { rotated, index, defaultIndex } = this.props

    return <div className={cx('XL', { rotated })}>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
    </div>
  }
}