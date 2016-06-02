import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from '../style.scss'
import { selectCell } from '../../../actions'

class Cell extends Component {

  static propTypes = {
    cell: PropTypes.number.isRequired,
    cellActive: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    isViewerTurn: PropTypes.bool.isRequired,
    selectedCell: PropTypes.number.isRequired,
  }

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

export default Cell
