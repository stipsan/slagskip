import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from 'classnames'
import Cell from './Cell'

class VersusGrid extends Component {

  static propTypes = {
    grid: PropTypes.arrayOf(PropTypes.number).isRequired,
    isViewerTurn: PropTypes.bool.isRequired,
    selectedCell: PropTypes.number,
  }

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
          {grid.map((cell, index) => (
            <Cell
              key={index}
              isViewerTurn={isViewerTurn}
              index={index}
              cellActive={selectedCell === index}
              cell={cell}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default VersusGrid
