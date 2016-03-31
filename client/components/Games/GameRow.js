import { Component } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
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

class GameRow extends Component {
  
  shouldComponentUpdate = shouldComponentUpdate
  
  render() {
    const { game, friends } = this.props
    const username = friends.getIn([game.get('versus'), 'username'])
    
    if(!username) return false
    
    console.log(game.toJS())
    
    const id = game.get('id')
    const online = friends.getIn([game.get('versus'), 'online']) === '1'
    const setupOrPlay = game.get('gameState') === 'setup' ? 'join' : 'game'
    return <Link to={`/${setupOrPlay}/${id}`} className={style.game}>
      <span className={online ? style.avatarOnline : style.avatar}>
        <Avatar colors={defaultColors} size="39" name={username} />
      </span>
      <span className={style.username}>{game.get('username')}</span>
      <span className={style.startGame}>❯</span>
    </Link>
  }
}

export default GameRow