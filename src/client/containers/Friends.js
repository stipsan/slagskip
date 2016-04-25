import { connect } from 'react-redux'

import Friends from '../components/Friends'
import { fetchFriends } from '../actions'

const mapStateToProps = state => ({
  friends: state.getIn(['friends', 'list']),
  friendsTotal: state.getIn(['friends', 'total']),
  username: state.getIn(['viewer', 'username'])
})

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(fetchFriends()),
  dispatch
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends)
