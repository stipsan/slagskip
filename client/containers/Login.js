import { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loginUser } from '../actions'

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
        dispatch(push({ pathname: redirectAfterLogin }));
    }
  }
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)