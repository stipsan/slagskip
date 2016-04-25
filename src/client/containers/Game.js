import { connect } from 'react-redux'

import Game from '../components/Game'
import {
  loadGame,
  resumeGame,
  pickSpot,
  checkSpot,
  fetchFriends,
 } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const versusFriendId = state.getIn(['game', 'versus'])
  return ({
    gameState: state.getIn(['game', 'gameState']),
    reasonFailed: state.getIn(['game', 'reasonFailed']),
    versusFriend: state.getIn(['friends', 'list', versusFriendId]) ||
                state.get('bots').find(bot => bot.get('id') === versusFriendId),
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
