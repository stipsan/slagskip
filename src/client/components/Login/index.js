import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import Form from './Form'

const placeholderLabel = 'E-mail'

export default class Login extends Component {
  static propTypes = {
    isRequestPending: PropTypes.bool.isRequired,
    signInWithEmailAndPassword: PropTypes.func.isRequired,
  }

  state = {
    shouldRegister: false,
    email: '',
    password: '',
    username: '',
  }

  componentDidMount() {
    this._input.focus()
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleSubmit = event => {
    event.preventDefault()

    const { shouldRegister, ...credentials } = this.state
    this.props[shouldRegister ?
      'createUserWithEmailAndPassword' :
      'signInWithEmailAndPassword'
    ](credentials)
  }

  handleShouldRegister = event => {
    event.preventDefault()

    this.setState({ shouldRegister: true })
  }

  handleShouldLogin = event => {
    event.preventDefault()

    this.setState({ shouldRegister: false })
  }

  handleEmailChange = event => this.setState({ email: event.target.value })

  handlePasswordChange = event => this.setState({ password: event.target.value })

  handleUsernameChange = event => this.setState({ username: event.target.value })

  render() {
    const {
      handleSubmit,
      handleShouldLogin,
      handleShouldRegister,
      handleUsernameChange,
      handleEmailChange,
      handlePasswordChange,
    } = this
    const {
      shouldRegister,
      email,
      password,
      username,
     } = this.state
    const {
      isRequestPending,
      checkIfEmailExists,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
    } = this.props

    const buttonLabel = shouldRegister ? 'Register' : 'Login'
    const activityLabel = shouldRegister ? 'Creating user…' : 'Logging in…'

    return <section className={cx('hero')}>
      <div className={cx('hero-head')}>
        <div className={cx('container')}>
          <img src="/favicons/icon.svg" width="64" height="64" role="presentation" />
        </div>
      </div>
      <div className={cx('hero-body')}>
        <Form
          handleCheckEmail={checkIfEmailExists}
          handleLogin={signInWithEmailAndPassword}
          handleRegister={createUserWithEmailAndPassword}
        />
        <div className={cx('container')}>
          <div className={cx('card')}>
            <header className={cx('card-header')}>
              <nav className={cx('card-tabs')}>
                <ul>
                  <li
                    className={cx({ 'is-active': !shouldRegister })}
                    onClick={handleShouldLogin}
                  >
                    <a>{'Sign in'}</a>
                  </li>
                  <li
                    className={cx({ 'is-active': shouldRegister })}
                    onClick={handleShouldRegister}
                  >
                    <a>{'New user'}</a>
                  </li>
                </ul>
              </nav>
            </header>
            <h1 className={cx('pendingMessage')} style={{ opacity: isRequestPending ? 1 : 0 }}>
              {activityLabel}
            </h1>
            <form
              className={cx('card-content')}
              onSubmit={handleSubmit}
              style={{ opacity: isRequestPending ? 0.4 : 1 }}
            >
              <p className={cx('control')}>
                <input
                  className={cx('input-email')}
                  ref={c => {
                    this._input = c
                  }}
                  type="email"
                  autoComplete="email"
                  placeholder={placeholderLabel}
                  disabled={isRequestPending}
                  value={email}
                  onChange={handleEmailChange}
                  minLength={3}
                  required
                  autoFocus
                />
              </p>
              <p className={cx('control')}>
                <input
                  className={cx('input-password')}
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                />
              </p>
              {shouldRegister && <p className={cx('control')}>
                <input
                  className={cx('input-username')}
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  autoComplete="name"
                  required
                />
              </p>}
              <p className={cx('control')}>
                <button
                  className={cx('button-login', { 'is-loading': isRequestPending })}
                  type="submit"
                  disabled={isRequestPending}
                >
                  {buttonLabel}
                </button>
              </p>
            </form>
          </div>
          <a className={cx('forgot-password')}>{'Forgot your password?'}</a>
        </div>
      </div>
      <div className={cx('hero-footer')}>
        <nav className={cx('footer-tabs')}>
          <div className={cx('container')}>
            <ul>
              <li><Link to="/about">{'About'}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  }
}
