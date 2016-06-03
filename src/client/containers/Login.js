import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  checkIfEmailExists,
} from '../actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isRequestPending: 'pending' === state.getIn(['auth', 'authState']),
  isCheckingEmail: 'emailcheck' === state.getIn(['auth', 'authState']),
  doesEmailExist: state.getIn(['auth', 'doesEmailExist']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  checkIfEmailExists: form => checkIfEmailExists(form.get('email')),
}, dispatch)

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
