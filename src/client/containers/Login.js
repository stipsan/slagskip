import { connect } from 'react-redux'

import Login from '../components/Login'
import { loginUser } from '../actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isRequestPending: 'pending' === state.getIn(['auth', 'authState']),
})

const mapDispatchToProps = dispatch => ({
  onLogin: username => dispatch(loginUser(username))
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
