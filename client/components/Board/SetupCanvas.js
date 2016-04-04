import { Component } from 'react'
import { DropTarget, DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import { BOARD_ITEM } from '../../constants/ItemTypes'
import style from './style.scss'

class Canvas extends Component {
  render() {
    const { children } = this.props
    return <div className={style.setupCanvas}>
      { children }
    </div>
  }
}

export const SetupCanvas = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Canvas)