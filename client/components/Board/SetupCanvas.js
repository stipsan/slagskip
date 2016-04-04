import { Component } from 'react'
import { DropTarget, DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import { BOARD_ITEM } from '../../constants/ItemTypes'
import style from './style.scss'

class Canvas extends Component {
  
  size = 320
  
  render() {
    const { children, connectDropTarget } = this.props
    return connectDropTarget(<div className={style.setupCanvas} ref={node => {
      if(node) {
        this.size = node.getBoundingClientRect().width
      }
    }}>
      { children }
    </div>)
  }
}
const CanvasDropTarget = DropTarget(BOARD_ITEM,
{
  drop: (props, monitor, component) => {
    
    const item = monitor.getItem();
    
    const delta = monitor.getDifferenceFromInitialOffset();
    console.log('onDrop', item, delta);
return;
    component.moveBox(item.id, left, top);
    
    //console.log('drop happen', monitor.getDropResult())
    if(!monitor.getInitialClientOffset() || !monitor.getInitialSourceClientOffset()) {
      console.error('what? no drop?', props, monitor, component)
      return
    }
    
    const indexOffset = monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x
    const offsetFactor = Math.floor(indexOffset / 32)
    console.log('indexOffset', offsetFactor)
    //console.log('drop', props, monitor, component)
    
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
})(Canvas)

export const SetupCanvas = DragDropContext(TouchBackend({ enableMouseEvents: true }))(CanvasDropTarget)