import { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import cx from './style.scss'

export class Grid extends Component {
  
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  render() {
    const { children } = this.props
    
    return <div className={cx('grid')}>{children}</div>
  }
}