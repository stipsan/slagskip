import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GameRow from './GameRow'
import style from './style.scss'

class Games extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  
  componentDidMount() {
    const { games, gamesTotal, fetchGames, friends, friendsTotal, fetchFriends } = this.props

    if(friends.size !== friendsTotal) {
      fetchFriends()
    }

    // @FIXME poor mans push sync
    //if(games.size !== gamesTotal) {
      fetchGames()
    //}
  }
  
  render() {
    const { children, games, gamesTotal, friends, friendsTotal, bots } = this.props
    
    if(!friends) return <h1>Loading…</h1>
    
    return <div>
      <Link to="new" className={style.game}>
        <span className={style.newGame}>
          +
        </span>
        <span className={style.username}>New Game</span>
        <span className={style.startGame}>❯</span>
      </Link>
      {gamesTotal > 0 && games.toArray().reverse().map(game => <GameRow key={game.get('id')} friendsTotal={friendsTotal} friends={friends} game={game} bots={bots} />) || <li>No games yet…</li>}
    </div>
  }
}

export default Games