import { connect } from 'react-redux'
import { loadGame, resumeGame, pickSpot, checkSpot } from '../actions'

import Game from '../components/Game'

const mapStateToProps = (state, ownProps) => {
  const versusFriendId = state.getIn(['game', 'versus'])
  return ({
  gameState: state.getIn(['game', 'gameState']),
  reasonFailed: state.getIn(['game', 'reasonFailed']),
  versusFriend: state.getIn(['friends', versusFriendId])
})
}

const mapDispatchToProps = dispatch => ({
  resumeGame: id => {
    dispatch(resumeGame(id))
  },
  loadGame: id => {
    dispatch(loadGame(id))
  },
  pickSpot: position => {
    dispatch(pickSpot(position))
  },
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)