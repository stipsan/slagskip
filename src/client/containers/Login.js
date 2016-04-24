import { connect } from 'react-redux'
import { loginUser } from '../actions'
import { Map as ImmutableMap } from 'immutable'

import Login from '../components/Login'

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
