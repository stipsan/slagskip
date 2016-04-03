import { Component } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget } from 'react-dnd'
import { 
  BOARD_ITEM
 } from '../../constants/ItemTypes'
import {
  cell as cellClassName,
  cellActive as cellActiveClassName,
  isOver as isOverClassName,
  canDrop as canDropClassName,
} from './style.scss'

class Cell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  handleClick = () => {
    this.props.rotateItem(this.props)
  }
  
  render() {
    const {
      index,
      value,
      isOver,
      canDrop,
      connectDropTarget,
    } = this.props
    
    //console.log(this.props.value)
    
    return connectDropTarget(<div className={className(cellClassName, {
      [cellActiveClassName]: value > 0,
      [isOverClassName]: isOver,
      [canDropClassName]: canDrop,
    })} />)
  }
}

export default DropTarget(
  BOARD_ITEM,
  {
    drop: (props, monitor, component) => {
      //
      //console.log('drop happen', monitor.getDropResult())
      if(!monitor.getInitialClientOffset() || !monitor.getInitialSourceClientOffset()) {
        console.error('what? no drop?', props, monitor, component)
        return
      }
      
      const indexOffset = monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x
      const offsetFactor = Math.floor(indexOffset / 32)
      console.log('indexOffset', offsetFactor)
      //console.log('drop', props, monitor, component)
      const item = monitor.getItem()
      
      item.addItem(item.type, props.index - offsetFactor)
      //console.log(monitor.getItem().addItem)
    },
    hover: (props, monitor, component) => {
      //console.log('hover', props, monitor, component)
    },
    canDrop: (props, monitor) => {
      //console.log('canDrop', props, monitor.getItem())
      
      return true
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