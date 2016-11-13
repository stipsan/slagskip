import Avatar from 'react-user-avatar'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Component } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from 'classnames'

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

const getTitle = (gameState, game, username) => {
  if ('defeat' === gameState) {
    return `${username} defeated you!`
  }
  if ('victory' === gameState) {
    return `You won in a game with ${username}!`
  }
  if ('setup' === gameState) {
    return `${username} invited you to play`
  }
  if ('waiting' === gameState) {
    return `Waiting for ${username} to join`
  }
  if ('ready' === gameState && game.get('isViewerTurn')) {
    return `Your turn against ${username}`
  }
  if ('ready' === gameState && !game.get('isViewerTurn')) {
    return `Waiting for ${username} to make a move`
  }

  return null
}

class GameRow extends Component {

  static propTypes = {
    // @TODO refactor to mapContains
    bots: ImmutablePropTypes.orderedMap.isRequired,
    friends: ImmutablePropTypes.orderedMap.isRequired,
    game: ImmutablePropTypes.map.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { game, friends, bots } = this.props
    const friend = friends.get(game.get('versus')) ||
      bots.find(bot => bot.get('id') === game.get('versus'))
    const username = friend && friend.get('username')
    const avatar = friend && friend.get('avatar')

    if (!username) return false

    const id = game.get('id')
    const online = '1' === friends.getIn([game.get('versus'), 'online'])
    const gameState = game.get('gameState')
    const setupOrPlay = 'setup' === gameState ? 'join' : 'game'

    const title = getTitle(gameState, game, username)


    return (
      <Link
        to={`/${setupOrPlay}/${id}`}
        className={cx('game uk-flex uk-flex-middle uk-flex-space-between', {
          gameWaiting: 'setup' === gameState || 'ready' === gameState
        })}
      >
        <span className={cx(online ? 'avatarOnline' : 'avatar')}>
          <Avatar colors={defaultColors} size="39" name={username} src={avatar} />
        </span>
        <span className={cx('username uk-flex-item-1 uk-margin-left uk-margin-right')}>{title}</span>
        <span className={cx('startGame')}>{'❯'}</span>
      </Link>
    )
  }
}

export default GameRow
