import { connect } from 'react-redux'

import NewGame from '../components/NewGame'
import { fetchFriends } from '../actions'

const mapStateToProps = state => ({
  friends: state.getIn(['friends', 'list']),
  friendsTotal: state.getIn(['friends', 'total']),
  bots: state.get('bots'),
})

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(fetchFriends())
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame)
