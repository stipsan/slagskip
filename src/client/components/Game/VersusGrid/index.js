import { Component } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from '../style.scss'
import { selectCell } from '../../../actions'

class Cell extends Component {

  shouldComponentUpdate = shouldComponentUpdate

  handleSelectCell = () => {
    const { index, cell, selectedCell, isViewerTurn } = this.props

    if (-1 === cell && selectedCell !== index && isViewerTurn) {
      this.props.dispatch(selectCell(index))
    }
  }

  render() {
    const { cell, cellActive } = this.props

    return (
      <div
        onClick={this.handleSelectCell}
        className={cx(
          'cell',
          {
            cellActive,
            cellEmpty: 0 === cell,
            cellJackpot: 1 === cell,
          }
        )}
      />
    )
  }
}

class VersusGrid extends Component {

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { grid, selectedCell, dispatch, isViewerTurn } = this.props

    return (
      <div
        className={cx('versusGridContainer', {
          versusGridWaiting: !isViewerTurn
        })}
      >
        <div className={cx('versusGrid')}>
          {grid.map((cell, index) => <Cell key={index} isViewerTurn={isViewerTurn} index={index} cellActive={selectedCell === index} cell={cell} dispatch={dispatch} />)}
        </div>
      </div>
    )
  }
}

export default VersusGrid
