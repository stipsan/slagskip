import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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
    return <section className="section section--login">
      <form onSubmit={handleSubmit}>
        <input ref={(c) => this._input = c} placeholder={placeholderLabel} minLength={3} required={true} autoFocus={true} />
        <button type="submit">{buttonLabel}</button>
      </form>
    </section>
  }
}