import { connect } from 'react-redux'
import {
  loadGame,
  resumeGame,
  pickSpot,
  checkSpot,
  fetchFriends,
 } from '../actions'

import Game from '../components/Game'

const mapStateToProps = (state, ownProps) => {
  const versusFriendId = state.getIn(['game', 'versus'])
  return ({
  gameState: state.getIn(['game', 'gameState']),
  reasonFailed: state.getIn(['game', 'reasonFailed']),
  versusFriend: state.getIn(['friends', 'list', versusFriendId]) || versusFriendId === '-1' && state.getIn(['bots', 0]),
  viewer: state.get('viewer'),
  isViewerTurn: state.getIn(['game', 'isViewerTurn']),
  versusGrid: state.getIn(['game', 'versusGrid']),
  viewerGrid: state.getIn(['game', 'viewerGrid']),
  selectedCell: state.getIn(['game', 'selectedCell']),
  versusScore: state.getIn(['game', 'versusScore']),
  viewerScore: state.getIn(['game', 'viewerScore']),
  viewerBoard: state.getIn(['game', 'viewerBoard']),
})
}

const mapDispatchToProps = dispatch => ({
  resumeGame: id => {
    dispatch(resumeGame(id))
  },
  loadGame: id => {
    dispatch(loadGame(id))
    // @TODO temp measure this is 
    dispatch(fetchFriends())
  },
  pickSpot: position => {
    dispatch(pickSpot(position))
  },
  dispatch,
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)