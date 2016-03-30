import { Component } from 'react'
import { Link } from 'react-router'
import style from './style.scss'

class Friend extends Component {
  render() {
    const { friend } = this.props
    const username = friend.get('username')
    const id = friend.get('id')
    return <Link to={`setup/${id}`} className={style.friend}>
      
      {friend.get('username')}
    </Link>
  }
}

export default Friend