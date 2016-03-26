import { connect } from 'react-redux'
import { loadGame, resumeGame, pickSpot, checkSpot } from '../actions'

import Game from '../components/Game'

const mapStateToProps = (state, ownProps) => {
  return ({
  gameState: state.getIn(['game', 'gameState']),
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