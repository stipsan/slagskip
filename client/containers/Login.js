import { connect } from 'react-redux'
import { loginUser, restoreLocation } from '../actions'

import Login from '../components/Login'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  redirectAfterLogin: state.auth.redirectAfterLogin,
})

const mapDispatchToProps = dispatch => ({
  onLogin: (username) => {
    dispatch(loginUser(username))
  },
  maybeRestoreLocation: (isAuthenticated, redirectAfterLogin = {}) => {
    const location = {
      pathname: '/',
      ...redirectAfterLogin,
    }
    
    if (isAuthenticated && location.pathname !== '/login') {
      dispatch(restoreLocation(location))
    }
  },
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)