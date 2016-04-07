import { Component, PropTypes } from 'react'
import className from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { BOARD_ITEM } from '../../../constants/ItemTypes'
import { DragLayer } from 'react-dnd'
import { XL, L, M, S, XS } from './index'
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
} from '../style.scss'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

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
const typeToComponent = {
  xl: XL,
  l: XL,
  m1: XL,
  m2: XL,
  s1: XL,
  s2: XL,
  xs1: XL,
  xs2: XL
}

const itemSource = {
  beginDrag(props) {
    return props
  }
}

function collect(monitor) {
  var item = monitor.getItem();
  console.log('DragPreview collect', item)
    return {
        id: item && item.id,
        name: item && item.name,
        type: item && item.type,
        rotated: item && item.rotated,
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
  
  renderItem(type, rotated) {
    switch(type) {
      case 'xl':
        return <XL rotated={rotated} />
      case 'l':
        return <L rotated={rotated} />
      case 'm1':
      case 'm2':
        return <M rotated={rotated} />
      case 's1':
      case 's2':
        return <S rotated={rotated} />
      case 'xs1':
      case 'xs2':
        return <XS rotated={rotated} />
    }
  }
  
  render() {
    
    const { type, rotated, isDragging } = this.props
    
    if (!isDragging) {
      return null;
    }
    
    
    console.log('drag preview component', type, rotated)
    return <div style={layerStyles}>
        <div
            className={className(itemPreview)}
            style={getItemStyles(this.props.currentOffset)}
        >
          {this.renderItem(type, rotated)}
        </div>
    </div>;
  }
}

export const DragPreview = DragLayer(collect)(ItemPreview)