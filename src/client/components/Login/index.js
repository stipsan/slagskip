import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import Form from './Form'

export default class Login extends Component {
  static propTypes = {
    isRequestPending: PropTypes.bool.isRequired,
    signInWithEmailAndPassword: PropTypes.func.isRequired,
    checkIfEmailExists: PropTypes.func.isRequired,
  }

  state = {
    shouldRegister: false,
    email: '',
    password: '',
    username: '',
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
      password,
      username,
     } = this.state
    const {
      isRequestPending,
      checkIfEmailExists,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      doesEmailExist,
    } = this.props


    return <section className={cx('hero')}>
      <div className={cx('hero-head')}>
        <div className={cx('container')}>
          <img src="/favicons/icon.svg" width="64" height="64" role="presentation" />
        </div>
      </div>
      <div className={cx('hero-body')}>
        <Form
          doesEmailExist={doesEmailExist}
          handleCheckEmail={checkIfEmailExists}
          handleLogin={signInWithEmailAndPassword}
          handleRegister={createUserWithEmailAndPassword}
        />
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
