import { connect } from 'react-redux'
import { fetchFriends } from '../actions'

import Lobby from '../components/Lobby'

const mapStateToProps = state => ({
  friends: state.getIn(['friends', 'list']),
  friendsTotal: state.getIn(['friends', 'total']),
  username: state.getIn(['viewer', 'username'])
})

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(fetchFriends())
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)