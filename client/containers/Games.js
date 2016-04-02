import { connect } from 'react-redux'
import { fetchGames, fetchFriends } from '../actions'
import Games from '../components/Games'

const mapStateToProps = state => ({
  games: state.getIn(['games', 'list']),
  gamesTotal: state.getIn(['games', 'total']),
  friends: state.getIn(['friends', 'list']),
  friendsTotal: state.getIn(['friends', 'total']),
  bots: state.get('bots'),
})

const mapDispatchToProps = dispatch => ({
  fetchGames: () => dispatch(fetchGames()),
  fetchFriends: () => dispatch(fetchFriends()),
  dispatch
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games)