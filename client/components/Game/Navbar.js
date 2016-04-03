import { Component } from 'react'
import { Link } from 'react-router'
import style, {
  navbar as navbarClassName,
  backLink as backLinkClassName,
} from './style.scss'

class Navbar extends Component {
  render() {
    const { viewer, versus } = this.props
    
    return <div className={navbarClassName}>
      <Link to="/" className={backLinkClassName}>❮ Back</Link>
      <div className={style.navbarTitle}>{viewer && viewer.get('username')} vs. {versus && versus.get('username')}</div>
    </div>
  }
}

export default Navbar