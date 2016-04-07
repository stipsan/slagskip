import { Component } from 'react'
import style from './style.scss'

export default class Title extends Component {
  render() {
    const { children } = this.props
    
    return <h1 className={style.headerTitle}>
      { children }
    </h1>
  }
}