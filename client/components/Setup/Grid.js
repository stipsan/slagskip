import { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { grid as gridClassName } from './style.scss'
import Cell from './Cell'

class Grid extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const { grid } = this.props
    
    return <div className={gridClassName}>
      {grid.map((value, index) => <Cell key={index} index={index} value={value} />)}
    </div>
  }
}

export default Grid