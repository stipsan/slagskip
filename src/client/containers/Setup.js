import { connect } from 'react-redux'

import Setup from '../components/Setup'
import {
  addItem,
  moveItem,
  rotateItem,
  fetchFriends,
  newGame,
  loadGame,
  joinGame
} from '../actions'

const mapStateToProps = state => ({
  bots: state.get('bots'),
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
  addItem: (type, startIndex, y) => {
    dispatch(addItem(type, startIndex, y))
  },
  moveItem: (type, startIndex, y) => {
    dispatch(moveItem(type, startIndex, y))
  },
  rotateItem: (type) => {
    dispatch(rotateItem(type))
  },
  loadGame: id => {
    dispatch(loadGame(id))
  },
  fetchFriends: () => dispatch(fetchFriends()),
  newGame: (versus, board) => dispatch(newGame({ versus, board })),
  joinGame: (game, board) => dispatch(joinGame({ game, board })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
