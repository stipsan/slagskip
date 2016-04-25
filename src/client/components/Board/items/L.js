import { Component } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from '../style.scss'

export class L extends Component {

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { rotated, index, defaultIndex } = this.props

    return (<div className={cx('L', { rotated })}>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
      <div className={cx('cell')}></div>
    </div>)
  }
}
