import { PureComponent, PropTypes } from 'react'

import cx from 'classnames'

class ViewerCell extends PureComponent {

  static propTypes = {
    value: PropTypes.number.isRequired,
  }

  handleSelectCell = () => {
    const { id, value, selectedCell } = this.props

    if (-1 === value && selectedCell !== id) {
      this.props.onSelectCell(id)
    }
  }

  render() {
    const { value, selected, size } = this.props

    return (
      <div
        style={{ height: `${size}px`, width: `${size}px` }}
        onClick={this.handleSelectCell}
        className={cx(
          'gamecell',
          {
            'is-selected': selected,
            'is-empty': 0 === value,
            'is-yay': 1 === value,
          }
        )}
      />
    )
  }
}

export default ViewerCell
