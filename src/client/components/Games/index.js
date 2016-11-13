import cx from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import GameRow from './GameRow'

import './index.less'

class Games extends Component {
  static propTypes = {
    bots: ImmutablePropTypes.list,
    fetchFriends: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
    friends: ImmutablePropTypes.orderedMap,
    friendsTotal: PropTypes.number.isRequired,
    games: ImmutablePropTypes.orderedMap,
    gamesTotal: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { /* games, gamesTotal, */ fetchGames, friends, friendsTotal, fetchFriends } = this.props

    if (friends.size !== friendsTotal) {
      fetchFriends()
    }

    // @FIXME poor mans push sync
    // if (games.size !== gamesTotal) {
    fetchGames()
    // }
  }

  render() {
    const { games, gamesTotal, friends, friendsTotal, bots } = this.props

    if (!friends) return <h1>{'Loading…'}</h1>

    return (
      <ul className="uk-list uk-list-line games-list">
        <li>
          <Link to="/new" className={cx('game uk-flex uk-flex-middle uk-flex-space-between')}>
            <span className={cx('newGame')}>
              {'+'}
            </span>
            <span className={cx('username uk-flex-item-1 uk-margin-left uk-margin-right')}>{'New Game'}</span>
            <span className={cx('startGame')}>{'❯'}</span>
          </Link>
        </li>
        {0 < gamesTotal && games.toArray().reverse().map(game => (
          <li key={game.get('id')}>
            <GameRow
              friendsTotal={friendsTotal}
              friends={friends}
              game={game}
              bots={bots}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default Games
