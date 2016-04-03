import { Component } from 'react'
import classNames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import style, {
  versusGrid as versusGridClassName,
  versusGridWaiting as versusGridWaitingClassName,
  cell as cellClassName,
  cellRemaining as cellRemainingClassName,
  cellEmpty as cellEmptyClassName,
  cellJackpot as cellJackpotClassName,
  cellXL as cellXLClassName,
  cellL as cellLClassName,
  cellM as cellMClassName,
  cellS as cellSClassName,
  cellXS as cellXSClassName,
} from './style.scss'


class Cell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  render() {
    const { index, cell, cellActive, type } = this.props

    return <div onClick={this.handleSelectCell} id={`index-${index}`} className={classNames(
      cellClassName,
      {
        [cellRemainingClassName]: cell === -1,
        [cellEmptyClassName]: cell === 0,
        [cellJackpotClassName]: cell === 1,
        [cellXLClassName]: type === 1,
        [cellLClassName]: type === 2,
        [cellMClassName]: type === 3 || type === 4,
        [cellSClassName]: type === 5 || type === 6,
        [cellXSClassName]: type === 7 || type === 8,
      }
    )} />
  }
}

class ViewerBoard extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { board, grid, turns, versus, score, isViewerTurn } = this.props
    
    return <div className={classNames(style.viewerGridContainer, {
      [style.viewerGridWaiting]: !isViewerTurn
    })}>
      <div className={versusGridClassName}>
        {grid.map((cell, index) => <Cell key={index} type={board.getIn(['grid', index])} index={index} cellActive={false} cell={cell} />)}
      </div>
    </div>
  }
}

export default ViewerBoard