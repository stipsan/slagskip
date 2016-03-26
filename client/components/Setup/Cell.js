import { Component } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget } from 'react-dnd'
import { 
  EXTRA_LARGE,
  LARGE,
  MEDIUM_FIRST,
  MEDIUM_SECOND,
  SMALL_FIRST,
  SMALL_SECOND,
  EXTRA_SMALL_FIRST,
  EXTRA_SMALL_SECOND,
 } from '../../constants/ItemTypes'
import { cell, cellActive } from './style.scss'

class Cell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const { index, value } = this.props
    
    return <div className={className(cell, {
      [cellActive]: value > 0
    })} />
  }
}

export default DropTarget(
  [
    EXTRA_LARGE,
    LARGE,
    MEDIUM_FIRST,
    MEDIUM_SECOND,
    SMALL_FIRST,
    SMALL_SECOND,
    EXTRA_SMALL_FIRST,
    EXTRA_SMALL_SECOND,
  ],
  {
    drop: (props, monitor, component) => {
      console.log('drop', props, monitor, component)
    },
    hover: (props, monitor, component) => {
      console.log('hover', props, monitor, component)
    },
    canDrop: (props, monitor) => {
      console.log('canDrop', props, monitor)
    }
  },
  (connect, monitor) => {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
  }
)(Cell)