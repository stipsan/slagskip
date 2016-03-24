import { Component } from 'react'
import className from 'classnames'
import { cell, cellActive } from './style.scss'

class Cell extends Component {
  render() {
    const { index, value } = this.props
    
    return <div className={className(cell, {
      [cellActive]: value > 0
    })} />
  }
}

export default Cell