import { Map as ImmutableMap } from 'immutable'
import { connect } from 'react-redux'

import Login from '../components/Login'
import { loginUser } from '../actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isRequestPending: state.getIn(['auth', 'authState']) === 'pending',
})

const mapDispatchToProps = dispatch => ({
  onLogin: (username) => {
    dispatch(loginUser(username))
  },
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
