import { connect } from 'react-redux'
import { addItem, fetchFriends, newGame, loadGame, joinGame } from '../actions'
import Setup from '../components/Setup'

const mapStateToProps = state => ({
  friends: state.getIn(['friends', 'list']),
  friendsTotal: state.getIn(['friends', 'total']),
  grid: state.getIn(['board', 'grid']),
  items: state.getIn(['board', 'items']),
  board: state.get('board'),
  username: state.getIn(['viewer', 'username']),
  versus: state.getIn(['setup', 'versus']),
  gameId: state.getIn(['game', 'id']),
  gameState: state.getIn(['game', 'gameState']),
  isValid: state.getIn(['board', 'grid']).count(item => item === 0) === 79,
})

const mapDispatchToProps = dispatch => ({
  addItem: (type, startIndex) => {
    dispatch(addItem(type, startIndex))
  },
  loadGame: id => {
    dispatch(loadGame(id))
  },
  fetchFriends: () => dispatch(fetchFriends()),
  newGame: (versus, board) => dispatch(newGame({versus, board})),
  joinGame: (game, board) => dispatch(joinGame({game, board})),
})

export default connect(mapStateToProps, mapDispatchToProps)(Setup)