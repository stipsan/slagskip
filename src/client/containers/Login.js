import { connect } from 'react-redux'

import Login from '../components/Login'
import { loginUser, registerUser } from '../actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isRequestPending: 'pending' === state.getIn(['auth', 'authState']),
})

const mapDispatchToProps = dispatch => ({
  onLogin: credentials => dispatch(loginUser(credentials)),
  onRegister: credentials => dispatch(registerUser(credentials))
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
