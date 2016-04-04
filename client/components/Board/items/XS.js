import { Component } from 'react'
import classNames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { indexToCSSTranslate } from './util'
import { DropTarget } from 'react-dnd'
import { 
  BOARD_ITEM
} from '../../../constants/ItemTypes'
import style from '../style.scss'

export class XS extends Component {
  render() {
    const { rotated, index, defaultIndex } = this.props
    const className = classNames(style.XS, rotated && style.rotated)
    const CSSTranslate = indexToCSSTranslate(index > -1 ? index : defaultIndex)

    return <div className={className} style={{ transform: CSSTranslate}}>
      <div className={style.cell}></div>
    </div>
  }
}