import { Component } from 'react'
import style from './style.scss'

export default class Navbar extends Component {
  render() {
    const { left, children, right } = this.props
    
    return <header className={style.header}>
      <div className={style.headerLeft}>
        {left}
      </div>
      <div className={style.headerCenter}>
        {children}
      </div>
      <div className={style.headerRight}>
        {right}
      </div>
    </header>
  }
}