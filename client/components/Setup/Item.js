import { Component, PropTypes } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { 
  EXTRA_LARGE,
  LARGE,
  MEDIUM_FIRST,
  MEDIUM_SECOND,
  SMALL_FIRST,
  SMALL_SECOND,
  EXTRA_SMALL_FIRST,
  EXTRA_SMALL_SECOND,
  BOARD_ITEM,
 } from '../../constants/ItemTypes'
import { DragSource } from 'react-dnd'
import {
  xl,
  l,
  m1,
  m2,
  s1,
  s2,
  xs1,
  xs2,
  isDragging as isDraggingClassName
} from './style.scss'

const types = {
  xl,
  l,
  m1,
  m2,
  s1,
  s2,
  xs1,
  xs2,
}

const itemSource = {
  beginDrag({ type, coordinates, addItem }) {
    return {
      type,
      coordinates,
      addItem,
    }
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
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const { type, isDragging, connectDragSource } = this.props
    
    return connectDragSource(<div className={className(types[type], {
      [isDraggingClassName]: isDragging
    })} />)
  }
}

export default DragSource(BOARD_ITEM, itemSource, collect)(Item)