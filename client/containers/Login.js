import { connect } from 'react-redux'
import { loginUser, restoreLocation } from '../actions'
import { Map as ImmutableMap } from 'immutable'

import Login from '../components/Login'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  redirectAfterLogin: state.getIn(['auth', 'redirectAfterLogin']),
  isRequestPending: state.getIn(['auth', 'authState']) === 'pending',
})

const mapDispatchToProps = dispatch => ({
  onLogin: (username) => {
    dispatch(loginUser(username))
  },
  // @TODO refactor to use react-router onEnter hooks instead, and onLeave for login
  maybeRestoreLocation: (isAuthenticated, redirectAfterLogin = {}) => {
    const location = ImmutableMap({
      pathname: '/',
    }).merge(redirectAfterLogin)
    if (isAuthenticated && location.get('pathname') !== '/login') {
      dispatch(restoreLocation(location))
    }
  },
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)