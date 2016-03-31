import { Component } from 'react'
import { Link } from 'react-router'
import {
  navbar as navbarClassName,
  backLink as backLinkClassName,
} from './style.scss'

class Navbar extends Component {
  render() {
    const { viewer, versus } = this.props
    
    return <div className={navbarClassName}>
      <Link to="/" className={backLinkClassName}>❮</Link>
      {viewer && viewer.get('username')} vs. {versus && versus.get('username')}
    </div>
  }
}

export default Navbar