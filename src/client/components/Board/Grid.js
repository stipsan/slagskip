import './index.less'

import cx from 'classnames'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

export class Grid extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { children } = this.props

    return <div className={cx('board-grid')}>{children}</div>
  }
}
