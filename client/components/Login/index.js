import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './style.scss'

const placeholderLabel = 'Username'
const buttonLabel = 'Enter'

function shouldCheckAuth ({
  maybeRestoreLocation,
  isAuthenticated,
  redirectAfterLogin,
} = this.props) {
  return maybeRestoreLocation(isAuthenticated, redirectAfterLogin)
}

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    maybeRestoreLocation: PropTypes.func.isRequired,
    isRequestPending: PropTypes.bool.isRequired,
  };

  handleSubmit = event => {
    event.preventDefault()

    this.props.onLogin(this._input.value)
  }
  
  componentWillMount = shouldCheckAuth
  componentWillReceiveProps = shouldCheckAuth
  
  componentDidMount() {
    this._input.focus()
  }

  render(){
    const { handleSubmit } = this
    const { isRequestPending } = this.props
    return <section className="section section--login">
      <h1 className="request-pending-message" style={{opacity: isRequestPending ? 1 : 0}}>
        Logging in…
      </h1>
      <form onSubmit={handleSubmit} style={{opacity: isRequestPending ? 0.4 : 1}}>
        <input ref={(c) => this._input = c} placeholder={placeholderLabel} minLength={3} required={true} autoFocus={true} disabled={isRequestPending} />
        <button type="submit" disabled={isRequestPending}>
          {buttonLabel}
        </button>
      </form>
      <div></div>
    </section>
  }
}