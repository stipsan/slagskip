import { Component } from 'react'
import { grid as gridClassName } from './style.scss'
import Cell from './Cell'

class Grid extends Component {
  render() {
    const { grid } = this.props
    
    return <div className={gridClassName}>
      {grid.map((value, index) => <Cell key={index} index={index} value={value} />)}
    </div>
  }
}

export default Grid