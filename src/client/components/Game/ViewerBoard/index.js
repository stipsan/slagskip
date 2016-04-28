import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from '../style.scss'
import Cell from './Cell'

class ViewerBoard extends Component {

  static propTypes = {
    board: PropTypes.shapeOf({
      grid: PropTypes.arrayOf(PropTypes.number),
    }),
    grid: PropTypes.arrayOf(PropTypes.number).isRequired,
    isViewerTurn: PropTypes.bool.isRequired,
    selectedCell: PropTypes.number,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { board, grid, isViewerTurn } = this.props

    return (
      <div
        className={cx('viewerGridContainer', {
          viewerGridWaiting: !isViewerTurn
        })}
      >
        <div className={cx('versusGrid')}>
          {grid.map((cell, index) => (
            <Cell
              key={index}
              type={board.getIn(['grid', index])}
              index={index}
              cellActive={false}
              cell={cell}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ViewerBoard
