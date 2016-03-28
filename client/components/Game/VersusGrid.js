import { Component } from 'react'
import {
  versusGrid as versusGridClassName,
} from './style.scss'

class VersusGrid extends Component {
  render() {
    const { grid, turns } = this.props
    
    return <div className={versusGridClassName}>
      VersusGrid
    </div>
  }
}

export default VersusGrid