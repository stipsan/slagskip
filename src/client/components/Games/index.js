import ImmutablePropTypes from 'react-immutable-proptypes'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import cx from './style.scss'
import GameRow from './GameRow'

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
    const { /* games, gamesTotal,*/ fetchGames, friends, friendsTotal, fetchFriends } = this.props

    if (friends.size !== friendsTotal) {
      fetchFriends()
    }

    // @FIXME poor mans push sync
    // if(games.size !== gamesTotal) {
    fetchGames()
    // }
  }

  render() {
    const { games, gamesTotal, friends, friendsTotal, bots } = this.props

    if (!friends) return <h1>{'Loading…'}</h1>

    return (<div className={cx('gamesList')}>
      <Link to="/new" className={cx('game')}>
        <span className={cx('newGame')}>
          {'+'}
        </span>
        <span className={cx('username')}>{'New Game'}</span>
        <span className={cx('startGame')}>{'❯'}</span>
      </Link>
      {0 < gamesTotal && games.toArray().reverse().map(game => (
        <GameRow
          key={game.get('id')}
          friendsTotal={friendsTotal}
          friends={friends}
          game={game}
          bots={bots}
        />
      ))}
    </div>)
  }
}

export default Games
