import { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { selectCell, fireCannon } from '../../actions'
import cx from './style.scss'

class Cell extends Component {
  handleSelectCell = event => {
    const { index, cell, selectedCell, isViewerTurn } = this.props

    if (cell === -1 && selectedCell !== index && isViewerTurn) {
      this.props.dispatch(selectCell(index))
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { index, cell, cellActive } = this.props

    return (<div onClick={this.handleSelectCell} className={cx(
      'cell',
      {
        cellActive,
        cellEmpty: cell === 0,
        cellJackpot: cell === 1,
      }
    )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         />)
  }
}

class VersusGrid extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { grid, turns, selectedCell, dispatch, isViewerTurn, versus, score, gameState } = this.props

    return (<div className={cx('versusGridContainer', {
      versusGridWaiting: !isViewerTurn
    })}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            >
      <div className={cx('versusGrid')}>
        {grid.map((cell, index) => <Cell key={index} isViewerTurn={isViewerTurn} index={index} cellActive={selectedCell === index} cell={cell} dispatch={dispatch} />)}
      </div>
    </div>)
  }
}

export default VersusGrid
