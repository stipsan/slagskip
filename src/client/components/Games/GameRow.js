import { Component } from 'react'
import classNames from 'classnames'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import Avatar from 'react-user-avatar'
import cx from './style.scss'

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
    const { game, friends, bots } = this.props
    const friend = friends.get(game.get('versus')) ||
      bots.find(bot => bot.get('id') === game.get('versus'))
    const username = friend && friend.get('username')
    const avatar = friend && friend.get('avatar') 
    
    if(!username) return false
    
    console.log(game.toJS())
    
    const id = game.get('id')
    const online = friends.getIn([game.get('versus'), 'online']) === '1'
    const gameState = game.get('gameState')
    const setupOrPlay = gameState === 'setup' ? 'join' : 'game'
    
    let title = ''
    if(gameState === 'defeat') {
      title = `${username} defeated you!`
    }
    if(gameState === 'victory') {
      title = `You won in a game with ${username}!`
    }
    if(gameState === 'setup') {
      title = `${username} invited you to play`
    }
    if(gameState === 'waiting') {
      title = `Waiting for ${username} to join`
    }
    if(gameState === 'ready' && game.get('isViewerTurn')) {
      title = `Your turn against ${username}`
    }
    if(gameState === 'ready' && !game.get('isViewerTurn')) {
      title = `Waiting for ${username} to make a move`
    }
  
    return <Link to={`/${setupOrPlay}/${id}`} className={cx('game', {
      gameWaiting: gameState === 'setup' || gameState === 'ready'
    })}>
      <span className={cx(online ? 'avatarOnline' : 'avatar')}>
        <Avatar colors={defaultColors} size="39" name={username} src={avatar} />
      </span>
      <span className={cx('username')}>{title}</span>
      <span className={cx('startGame')}>❯</span>
    </Link>
  }
}

export default GameRow