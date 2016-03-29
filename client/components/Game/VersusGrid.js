import { Component } from 'react'
import classNames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { selectCell, fireCannon } from '../../actions'
import {
  versusGrid as versusGridClassName,
  versusGridWaiting as versusGridWaitingClassName,
  cell as cellClassName,
  cellActive as cellActiveClassName,
  cellEmpty as cellEmptyClassName,
  cellJackpot as cellJackpotClassName,
} from './style.scss'

class Cell extends Component {
  handleSelectCell = event => {
    const { index, cell, selectedCell, isViewerTurn } = this.props
  
    if(cell === -1 && selectedCell !== index && isViewerTurn) {
      this.props.dispatch(selectCell(index))
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  render() {
    const { index, cell, cellActive } = this.props

    return <div onClick={this.handleSelectCell} className={classNames(
      cellClassName,
      {
        [cellActiveClassName]: cellActive,
        [cellEmptyClassName]: cell === 0,
        [cellJackpotClassName]: cell === 1,
      }
    )} />
  }
}

class VersusGrid extends Component {
  
  handleFireCannon = event => {
    this.props.dispatch(fireCannon(this.props.selectedCell))
  }
  
  render() {
    const { grid, turns, selectedCell, dispatch, isViewerTurn, versus } = this.props

    return <div>
      {isViewerTurn ? (selectedCell === -1 ? <h5>Select a spot</h5> : <h5>Send it when you're ready<button onClick={this.handleFireCannon}>Send</button></h5>) : <h5>Waiting for {versus && versus.get('username') || 'opponent'} to make a move…</h5>}
      <div className={classNames(versusGridClassName, {
        [versusGridWaitingClassName]: !isViewerTurn
      })}>
        {grid.map((cell, index) => <Cell key={index} isViewerTurn={isViewerTurn} index={index} cellActive={selectedCell === index} cell={cell} dispatch={dispatch} />)}
      </div>
    </div>
  }
}

export default VersusGrid