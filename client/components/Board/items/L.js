import { Component } from 'react'
import classNames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget } from 'react-dnd'
import { 
  BOARD_ITEM
} from '../../../constants/ItemTypes'
import style from '../style.scss'

export class L extends Component {
  render() {
    const { rotated, index, defaultIndex } = this.props
    const className = classNames(style.L, rotated && style.rotated)

    return <div className={className}>
      <div className={style.cell}></div>
      <div className={style.cell}></div>
      <div className={style.cell}></div>
      <div className={style.cell}></div>
    </div>
  }
}