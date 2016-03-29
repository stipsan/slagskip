import { Component, PropTypes } from 'react'
import style from './style.scss'

class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  
  render() {
    const { children } = this.props
    
    return <div className={style.dashboard}>
      <h1 className={style.header}>Welcome to the index!</h1>
      <div className={style.tabs}>
        <ul>
          <li className="is-active"><a>Pictures</a></li>
          <li><a>Music</a></li>
          <li><a>Videos</a></li>
          <li><a>Documents</a></li>
        </ul>
      </div>
    </div>
  }
}

export default Dashboard