import { Component } from 'react'
import classNames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { selectCell, fireCannon } from '../../actions'
import {
  versusGrid as versusGridClassName,
  cell as cellClassName,
  cellActive as cellActiveClassName,
  cellEmpty as cellEmptyClassName,
  cellJackpot as cellJackpotClassName,
} from './style.scss'

class Cell extends Component {
  handleSelectCell = event => {
    const { index, cell, selectedCell } = this.props
  
    this.props.dispatch(selectCell(index))
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  render() {
    const { index, cell, cellActive } = this.props
    console.log(cellClassName)
    return <div onClick={this.handleSelectCell} className={classNames(
      cellClassName,
      {
        [cellActiveClassName]: cellActive
      }
    )} />
  }
}

class VersusGrid extends Component {
  
  handleFireCannon = event => {
    this.props.dispatch(fireCannon(this.props.selectedCell))
  }
  
  render() {
    const { grid, turns, selectedCell, dispatch } = this.props

    return <div>
      {selectedCell === -1 && <h1>Select a spot</h1> || <h1>Send it when you're ready<button onClick={this.handleFireCannon}>Send</button></h1>}
      <div className={classNames(versusGridClassName)}>
        {grid.map((cell, index) => <Cell key={index} index={index} cellActive={selectedCell === index} cell={cell} dispatch={dispatch} />)}
      </div>
    </div>
  }
}

export default VersusGrid