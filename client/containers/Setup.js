import { connect } from 'react-redux'
import { addItem, fetchFriends, newGame } from '../actions'
import Setup from '../components/Setup'

const mapStateToProps = state => ({
  friends: state.getIn(['friends', 'list']),
  friendsTotal: state.getIn(['friends', 'total']),
  grid: state.getIn(['board', 'grid']),
  items: state.getIn(['board', 'items']),
  board: state.get('board'),
  username: state.getIn(['viewer', 'username']),
  versus: state.getIn(['setup', 'versus']),
})

const mapDispatchToProps = dispatch => ({
  addItem: (type, startIndex) => {
    dispatch(addItem(type, startIndex))
  },
  fetchFriends: () => dispatch(fetchFriends()),
  newGame: board => dispatch(newGame(board))
})

export default connect(mapStateToProps, mapDispatchToProps)(Setup)