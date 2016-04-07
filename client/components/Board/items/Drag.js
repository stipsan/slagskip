import { Children, Component, PropTypes } from 'react'
import { BOARD_ITEM } from '../../../constants/ItemTypes'
import { DragSource } from 'react-dnd'
import { indexToCSSTranslate } from '../util'
import cx from '../style.scss'

const defaultStyle = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

const itemSource = {
  beginDrag({ type, index, defaultIndex, rotated, addItem }) {
    return { type, index, defaultIndex, rotated, addItem }
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
  }
  
  handleRotate = () => {
    const { type } = this.props
    this.props.rotateItem(type)
  }

  render() {
    const { hideSourceOnDrag, size, type, index, defaultIndex, connectDragSource, isDragging, rotated, children } = this.props;

    const dropped = index > -1
    const CSSTranslate = indexToCSSTranslate(dropped ? index : defaultIndex, size, rotated)

    return connectDragSource(
      <div className={cx('draggable', { rotated , dropped, hidden: isDragging })} style={{ transform: CSSTranslate}} onClick={this.handleRotate}>
        {children}
      </div>
    );
  }
}

export const Drag = DragSource(BOARD_ITEM, itemSource, collect)(Item)