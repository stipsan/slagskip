import { connect } from 'react-redux'
import { fetchFriends } from '../actions'

import Dashboard from '../components/Dashboard'

const mapStateToProps = state => ({
  username: state.getIn(['viewer', 'username'])
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
