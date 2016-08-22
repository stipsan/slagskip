import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { DragLayer } from 'react-dnd'

import cx from 'classnames'
import { XL, L, M, S, XS } from './index'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

const collect = monitor => {
  const item = monitor.getItem()
  console.log(item)
  return {
    type: item && item.type,
    rotated: item && item.rotated,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

const getItemStyles = currentOffset => {
  if (!currentOffset) {
    return { display: 'none' }
  }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`

  return {
    pointerEvents: 'none',
    WebkitTransform: transform,
    transform,
  }
}

class ItemPreview extends Component {
  static propTypes = {
    currentOffset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    isDragging: PropTypes.bool,
    rotated: PropTypes.number,
    type: PropTypes.string,
  }

  shouldComponentUpdate = shouldComponentUpdate

  renderItem(type, rotated) {

    switch (type) {
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
    default:
      return null
    }
  }

  render() {

    const { type, rotated, isDragging, currentOffset } = this.props

    if (!isDragging) {
      return null
    }

    return (<div style={layerStyles}>
      <div className={cx('itemPreview', { rotated })} style={getItemStyles(currentOffset)}>
        {this.renderItem(type, rotated)}
      </div>
    </div>)
  }
}

export const DragPreview = DragLayer(collect)(ItemPreview)
