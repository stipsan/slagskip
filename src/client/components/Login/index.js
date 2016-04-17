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
        <div className={cx('container')}>
          <div className={cx('card')}>
            <header className={cx('card-header')}>
            <nav className={cx('card-tabs')}>
              <ul>
                <li className={cx('is-active')}><a>Sign in</a></li>
                <li><a>New user</a></li>
              </ul>
            </nav>
            </header>
            <h1 className={cx('pendingMessage')} style={{opacity: isRequestPending ? 1 : 0}}>
              Logging in…
            </h1>
            <form className={cx('card-content')} onSubmit={handleSubmit} style={{opacity: isRequestPending ? 0.4 : 1}}>
              <p className={cx('control')}>
                <input className={cx('input-email')} ref={(c) => this._input = c} placeholder={placeholderLabel} minLength={3} required={true} autoFocus={true} disabled={isRequestPending} />
              </p>
              <p className={cx('control')}>
                <input className={cx('input-password')} type="password" />
              </p>
              <p className={cx('control')}>
                <button lassName={cx('button-login')} type="submit" disabled={isRequestPending}>
                  {buttonLabel}
                </button>
              </p>
              
            </form>
            <h1 className={cx('title')}>
              Title
            </h1>
            <h2 className={cx('subtitle')}>
              Subtitle
            </h2>
          </div>
        </div>
      </div>

      <div className={cx('hero-footer')}>
        <nav className={cx('footer-tabs')}>
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