import { Component } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from './style.scss'

class Cell extends Component {

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { index, cell, cellActive, type } = this.props

    return (<div onClick={this.handleSelectCell} id={`index-${index}`} className={cx(
      'cell',
      {
        cellRemaining: cell === -1,
        cellEmpty: cell === 0,
        cellJackpot: cell === 1,
        cellXL: type === 1,
        cellL: type === 2,
        cellM: type === 3 || type === 4,
        cellS: type === 5 || type === 6,
        cellXS: type === 7 || type === 8,
      }
    )}
                                                                                                                                                                                                                                                                                                            />)
  }
}

class ViewerBoard extends Component {

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { board, grid, turns, versus, score, isViewerTurn } = this.props

    return (<div className={cx('viewerGridContainer', {
      viewerGridWaiting: !isViewerTurn
    })}
    >
      <div className={cx('versusGrid')}>
        {grid.map((cell, index) => <Cell key={index} type={board.getIn(['grid', index])} index={index} cellActive={false} cell={cell} />)}
      </div>
    </div>)
  }
}

export default ViewerBoard
