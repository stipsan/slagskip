import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { loginUser, restoreLocation } from '../actions'

import Login from '../components/Login'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  redirectAfterLogin: state.auth.redirectAfterLogin,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username) => {
    dispatch(loginUser(username))
  },
  checkAuth: (isAuthenticated, redirectAfterLogin) => {
    console.log('checkAuth',dispatch, isAuthenticated, redirectAfterLogin);
    if (isAuthenticated) {
        dispatch(replace({ ...redirectAfterLogin }));
    }
  }
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)