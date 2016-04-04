import { Component, PropTypes } from 'react'
import { BOARD_ITEM } from '../../../constants/ItemTypes'
import { DragSource } from 'react-dnd'
import { indexToCSSTranslate } from '../util'
import style from '../style.scss'

const defaultStyle = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

const itemSource = {
  beginDrag({ type, index, defaultIndex, addItem }) {
    return { type, index, defaultIndex, addItem }
  }
};

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
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
    children: PropTypes.node
  };

  render() {
    const { hideSourceOnDrag, type, index, defaultIndex, connectDragSource, isDragging, children } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    const CSSTranslate = indexToCSSTranslate(index > -1 ? index : defaultIndex)

    return connectDragSource(
      <div className={style.draggable} style={{ transform: CSSTranslate}}>
        {children}
      </div>
    );
  }
}

export const Drag = DragSource(BOARD_ITEM, itemSource, collect)(Item)