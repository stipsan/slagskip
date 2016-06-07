import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import Form from './Form'

export default class Login extends Component {
  static propTypes = {
    checkIfEmailExists: PropTypes.func.isRequired,
    createUserWithEmailAndPassword: PropTypes.func.isRequired,
    doesEmailExist: PropTypes.bool,
    isRequestPending: PropTypes.bool.isRequired,
    signInWithEmailAndPassword: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const {
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
        <div className={cx('container')}>
          <Form
            doesEmailExist={doesEmailExist}
            handleCheckEmail={checkIfEmailExists}
            handleLogin={signInWithEmailAndPassword}
            handleRegister={createUserWithEmailAndPassword}
          />
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
