import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cx from './style.scss'

const placeholderLabel = `Username, try 'Batman' or 'Superman'`
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
    return <section className={cx('hero')}>

      <div className={cx('hero-header')}>
        <div className={cx('container')}>
          <img src="/favicons/icon.svg" width="64" height="64" />
        </div>
      </div>

      <div className={cx('hero-content')}>
        <div className={cx('card')}>
          <h1 className={cx('pendingMessage')} style={{opacity: isRequestPending ? 1 : 0}}>
            Logging in…
          </h1>
          <form onSubmit={handleSubmit} style={{opacity: isRequestPending ? 0.4 : 1}}>
            <input ref={(c) => this._input = c} placeholder={placeholderLabel} minLength={3} required={true} autoFocus={true} disabled={isRequestPending} />
            <button type="submit" disabled={isRequestPending}>
              {buttonLabel}
            </button>
          </form>
          <h1 className={cx('title')}>
            Title
          </h1>
          <h2 className={cx('subtitle')}>
            Subtitle
          </h2>
        </div>
      </div>

      <div className={cx('hero-footer')}>
        <nav className={cx('tabs')}>
          <div className={cx('container')}>
            <ul>
              <li><a>About</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  }
}