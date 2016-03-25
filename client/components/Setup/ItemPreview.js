import { Component, PropTypes } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { EXTRA_LARGE } from '../../constants/ItemTypes'
import { DragLayer } from 'react-dnd'
import {
  xl,
  l,
  m1,
  m2,
  s1,
  s2,
  xs1,
  xs2,
  isDragging,
  itemPreview,
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

function collect(monitor) {
  var item = monitor.getItem();
    return {
        id: item && item.id,
        name: item && item.name,
        type: item && item.type,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}



function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}

class ItemPreview extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    isDragging: PropTypes.bool
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    return (
        <div
            className={className(itemPreview, types[this.props.type])}
            style={getItemStyles(this.props.currentOffset)}
        >
            {this.props.id} {this.props.name}
        </div>
    );
  }
}

export default DragLayer(collect)(ItemPreview)