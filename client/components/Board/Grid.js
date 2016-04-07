import { Component, PropTypes } from 'react'
import classNames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import style from './style.scss'

export class Grid extends Component {
  
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  render() {
    const { children } = this.props
    
    return <div className={style.grid}>{children}</div>
  }
}