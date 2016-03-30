import { Component } from 'react'
import { Link } from 'react-router'
import Avatar from 'react-user-avatar'
import style from './style.scss'

const defaultColors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d'
]

class Friend extends Component {
  render() {
    const { friend } = this.props
    const username = friend.get('username')
    const id = friend.get('id')
    return <Link to={`setup/${id}`} className={style.friend}>
      <span className={style.avatar}>
        <span><Avatar colors={defaultColors} size="39" name={username} /></span>
      </span>
      <span className={style.username}>{friend.get('username')}</span>
      <span className={style.startGame}>❯</span>
    </Link>
  }
}

export default Friend