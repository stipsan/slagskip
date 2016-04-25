import TouchBackend from 'react-dnd-touch-backend'
import { Component } from 'react'
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

  itemSize = 32

  handleDrop = (item, delta) => {

    const { itemSize } = this
    const { addItem, moveItem } = this.props

    console.log('SetupCanvas handleDrop', item, delta, itemSize)
    console.log('handleDrop x', Math.round(delta.x / itemSize))

    if (item.index === -1) {
      const [initialX, initialY] = indexToCoordinates(item.defaultIndex)
      const x = Math.round(delta.x / itemSize)
      const y = Math.round(delta.y / itemSize)
      const negativeIndex = item.defaultIndex - 100
      const offsetX = initialX + x
      const offsetY = initialY + y
      console.log('handleDrop startX', negativeIndex, offsetX, initialX, initialY)

      addItem(item.type, offsetX, offsetY)
    } else {
      const [initialX, initialY] = indexToCoordinates(item.index)
      const x = Math.round(delta.x / itemSize)
      const y = Math.round(delta.y / itemSize)
      const negativeIndex = item.defaultIndex - 100
      const offsetX = initialX + x
      const offsetY = initialY + y
      console.log('handleDrop startX', negativeIndex, offsetX, initialX, initialY)

      moveItem(item.type, offsetX, offsetY)
    }


  }

  render() {
    const { children, connectDropTarget } = this.props
    return connectDropTarget(<div className={cx('setupCanvas')} ref={node => {
      if (node) {
        this.itemSize = node.getBoundingClientRect().width / 10
      }
    }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              >
      {children}
    </div>)
  }
}
const CanvasDropTarget = DropTarget(BOARD_ITEM,
  {
    drop: (props, monitor, component) => {

      const item = monitor.getItem()

      const delta = monitor.getDifferenceFromInitialOffset()
      console.log('onDrop', item, delta, component.itemSize)

      component.handleDrop(item, delta)
    },
    canDrop: (props, monitor) => {
    // console.log('canDrop', props, monitor.getItem())

      return true
    }
  },
(connect, monitor) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    itemType: monitor.getItemType()
  }
})(Canvas)

export const SetupCanvas = DragDropContext(TouchBackend({ enableMouseEvents: true }))(CanvasDropTarget)
