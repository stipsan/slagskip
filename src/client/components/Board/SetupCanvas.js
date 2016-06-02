import TouchBackend from 'react-dnd-touch-backend'
import { Component, PropTypes } from 'react'
import { DropTarget, DragDropContext } from 'react-dnd'

import cx from './style.scss'
import { BOARD_ITEM } from '../../constants/ItemTypes'

// @TODO maybe move this to a shared utility
const indexToCoordinates = index => {
  const y = Math.floor(index / 10)
  const x = index - (y * 10)
  return [x, y]
}

class Canvas extends Component {

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
  }

  itemSize = 32

  handleDrop = (item, delta) => {

    const { itemSize } = this
    const { addItem, moveItem } = this.props

    if (-1 === item.index) {
      const [initialX, initialY] = indexToCoordinates(item.defaultIndex)
      const x = Math.round(delta.x / itemSize)
      const y = Math.round(delta.y / itemSize)
      const offsetX = initialX + x
      const offsetY = initialY + y

      addItem(item.type, offsetX, offsetY)
    } else {
      const [initialX, initialY] = indexToCoordinates(item.index)
      const x = Math.round(delta.x / itemSize)
      const y = Math.round(delta.y / itemSize)
      const offsetX = initialX + x
      const offsetY = initialY + y

      moveItem(item.type, offsetX, offsetY)
    }
  }

  render() {
    const { children, connectDropTarget } = this.props
    return connectDropTarget(
      <div
        className={cx('setupCanvas')}
        ref={node => {
          if (node) {
            this.itemSize = node.getBoundingClientRect().width / 10
          }
        }}
      >
        {children}
      </div>
    )
  }
}
const CanvasDropTarget = DropTarget(BOARD_ITEM,
  {
    drop: (props, monitor, component) => {

      const item = monitor.getItem()

      const delta = monitor.getDifferenceFromInitialOffset()

      component.handleDrop(item, delta)
    },
    canDrop: () => true
  },
(connect, monitor) => {
  /* eslint arrow-body-style: ["off"] */
  return {
    connectDropTarget: connect.dropTarget(),
    itemType: monitor.getItemType(),
  }
})(Canvas)

export const SetupCanvas = DragDropContext(TouchBackend({
  enableMouseEvents: true
}))(CanvasDropTarget)
