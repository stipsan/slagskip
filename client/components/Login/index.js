import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const placeholderLabel = 'Username'
const buttonLabel = 'Enter'

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
  };

  handleSubmit = event => {
    event.preventDefault()

    this.props.onLogin(this._input.value)
  }
  
  componentWillMount () {
    const { isAuthenticated, redirectAfterLogin } = this.props
    this.props.checkAuth(isAuthenticated, redirectAfterLogin);
  }

  componentWillReceiveProps (nextProps) {
    const { isAuthenticated, redirectAfterLogin } = nextProps
    this.props.checkAuth(isAuthenticated, redirectAfterLogin);
  }
  
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

export default connect()(Login)