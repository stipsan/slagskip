import { Component } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { cell, cellActive } from './style.scss'

class Cell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const { index, value } = this.props
    
    return <div className={className(cell, {
      [cellActive]: value > 0
    })} />
  }
}

export default Cell