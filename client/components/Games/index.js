import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GameRow from './GameRow'

class Games extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  
  componentDidMount() {
    const { games, gamesTotal, fetchGames, friends, friendsTotal, fetchFriends } = this.props

    if(friends.size !== friendsTotal) {
      fetchFriends()
    }

    if(games.size !== gamesTotal) {
      fetchGames()
    }
  }
  
  render() {
    const { children, games, gamesTotal, friends, friendsTotal } = this.props
    
    if(!friends) return <h1>Loading…</h1>
    
    return <ul>
      <li><Link to="new">New Game</Link></li>
      
      {gamesTotal > 0 && games.toArray().map(game => <GameRow key={game.get('id')} friendsTotal={friendsTotal} friends={friends} game={game} />) || <li>No games yet…</li>}
    </ul>
  }
}

export default Games