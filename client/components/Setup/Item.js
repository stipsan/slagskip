import { Component, PropTypes } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { EXTRA_LARGE } from '../../constants/ItemTypes'
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
    return {}
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

export default DragSource(EXTRA_LARGE, itemSource, collect)(Item)