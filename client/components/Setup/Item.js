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
  isDragging
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
  beginDrag(props) {
    return {type: props.type}
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
      isDragging
    })} />)
  }
}

export const ExtraLarge = DragSource(EXTRA_LARGE, itemSource, collect)(Item)
export const Large = DragSource(LARGE, itemSource, collect)(Item)
export const Medium1 = DragSource(MEDIUM_FIRST, itemSource, collect)(Item)
export const Medium2 = DragSource(MEDIUM_SECOND, itemSource, collect)(Item)
export const Small1 = DragSource(SMALL_FIRST, itemSource, collect)(Item)
export const Small2 = DragSource(SMALL_SECOND, itemSource, collect)(Item)
export const ExtraSmall1 = DragSource(EXTRA_SMALL_FIRST, itemSource, collect)(Item)
export const ExtraSmall2 = DragSource(EXTRA_SMALL_SECOND, itemSource, collect)(Item)