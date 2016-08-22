import { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

import cx from 'classnames'
import { BOARD_ITEM } from '../../../constants/ItemTypes'
import { indexToCSSTranslate } from '../util'

const itemSource = {
  beginDrag({ type, index, defaultIndex, rotated, addItem }) {
    return { type, index, defaultIndex, rotated, addItem }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Item extends Component {
  static propTypes = {
    children: PropTypes.node,
    connectDragSource: PropTypes.func.isRequired,
    defaultIndex: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    left: PropTypes.number.isRequired,
    rotated: PropTypes.bool.isRequired,
    rotateItem: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }

  handleRotate = () => {
    const { type } = this.props
    this.props.rotateItem(type)
  }

  render() {
    const {
      children,
      connectDragSource,
      defaultIndex,
      index,
      isDragging,
      rotated,
      size,
    } = this.props

    const dropped = -1 < index
    const CSSTranslate = indexToCSSTranslate(dropped ? index : defaultIndex, size, rotated)

    return connectDragSource(
      <div
        className={cx('draggable', { rotated, dropped, hidden: isDragging })}
        style={{ transform: CSSTranslate }}
        onClick={this.handleRotate}
      >
        {children}
      </div>
    )
  }
}

export const Drag = DragSource(BOARD_ITEM, itemSource, collect)(Item)
