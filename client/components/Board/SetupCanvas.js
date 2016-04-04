import { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import { default as TouchBackend } from 'react-dnd-touch-backend'

class Canvas extends Component {
  render() {
    const { children } = this.props
    return <div>
      { children }
    </div>
  }
}

export const SetupCanvas = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Canvas)