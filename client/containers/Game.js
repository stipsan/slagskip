import { connect } from 'react-redux'
import { resumeGame, pickSpot, checkSpot } from '../actions'

import Game from '../components/Game'

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  redirectAfterLogin: state.getIn(['auth', 'redirectAfterLogin']),
  isRequestPending: state.getIn(['auth', 'authState']) === 'pending',
})
}

const mapDispatchToProps = dispatch => ({
  resumeGame: id => {
    dispatch(resumeGame(id))
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