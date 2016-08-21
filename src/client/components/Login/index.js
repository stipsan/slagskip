import cx from 'classnames'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form/immutable'

import asyncValidate from './asyncValidate'
import validate from './validate'
import FieldComponent from './Field'
import Form from './Form'

const formStyle = Object.freeze({
  width: '250px'
})

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

    return (
      <div className="uk-flex uk-flex-column uk-height-1-1">
        <div className="uk-flex-item-auto uk-flex uk-flex-center uk-flex-middle">
          <div className="uk-text-center" style={formStyle}>
            <img
              src="/favicons/icon.svg"
              className="uk-margin-bottom"
              width="64"
              height="64"
              role="presentation"
            />
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
          </div>
        </div>
        <div className="uk-flex-item-none">
          <ul className="uk-subnav uk-subnav-line uk-flex-center">
            <li><Link to="/about">{'About'}</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
