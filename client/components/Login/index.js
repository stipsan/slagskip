import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  section as sectionClassName,
  pendingMessage as pendingMessageClassName,
} from './style.scss'

const placeholderLabel = 'Username'
const buttonLabel = 'Enter'

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    isRequestPending: PropTypes.bool.isRequired,
  };

  handleSubmit = event => {
    event.preventDefault()

    this.props.onLogin(this._input.value)
  }
  
  componentDidMount() {
    this._input.focus()
  }

  render(){
    const { handleSubmit } = this
    const { isRequestPending } = this.props
    return <section className={sectionClassName}>
      <h1 className={pendingMessageClassName} style={{opacity: isRequestPending ? 1 : 0}}>
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