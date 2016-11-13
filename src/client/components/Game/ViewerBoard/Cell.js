import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from 'classnames'

class Cell extends Component {

  static propTypes = {
    cell: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { index, cell, type } = this.props

    return (
      <div
        onClick={this.handleSelectCell}
        id={`index-${index}`}
        className={cx(
          'cell',
          {
            cellRemaining: -1 === cell,
            'is-empty': 0 === cell,
            'is-yay': 1 === cell,
            cellXL: 1 === type,
            cellL: 2 === type,
            cellM: 3 === type || 4 === type,
            cellS: 5 === type || 6 === type,
            cellXS: 7 === type || 8 === type,
          }
        )}
      />
    )
  }
}

export default Cell
