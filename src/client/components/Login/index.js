import './index.less'

import cx from 'classnames'
import Collapse from 'react-collapse'
import Field from 'epic-client/components/Form/Field'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { renderInput } from 'redux-form-uikit'
import { Button } from 'uikit-react'

const wrapperStyle = Object.freeze({
  minHeight: '460px',
  overflow: 'auto',
})

const formStyle = Object.freeze({
  width: '250px'
})

export default class Login extends Component {
  static propTypes = {
    createUserWithEmailAndPassword: PropTypes.func.isRequired,
    doesEmailExist: PropTypes.bool,
    signInWithEmailAndPassword: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  }

  handleSubmit = this.props.handleSubmit(data => {
    const { doesEmailExist } = this.props
    if (doesEmailExist === false && data.has('username')) {
      return this.props.createUserWithEmailAndPassword(data)
    }
    if (doesEmailExist === true && data.has('password')) {
      return this.props.signInWithEmailAndPassword(data)
    }
  })

  render() {
    const {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      doesEmailExist,
      submitting,
    } = this.props
    const { handleSubmit } = this

    return (
      <div className="uk-flex uk-flex-column uk-height-1-1">
        <div
          className="uk-flex-item-auto uk-flex uk-flex-center uk-flex-middle"
          style={wrapperStyle}
        >
          <div className="uk-text-center" style={formStyle}>
            <img
              src="/favicons/icon.svg"
              className="uk-margin-bottom"
              width="64"
              height="64"
              role="presentation"
            />
            <form className="uk-panel uk-panel-box uk-form uk-text-left" onSubmit={handleSubmit}>
              <Field
                large
                required
                component={renderInput}
                errorDisplay="block"
                icon="envelope"
                name="email"
                placeholder="E-mail"
                type="email"
                width="full"
                wrapperClassName="uk-width-1-1"
              />
              <Collapse key="password" isOpened={doesEmailExist !== null} className="uk-form-row">
                <Field
                  large
                  required
                  component={renderInput}
                  errorDisplay="block"
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  type="password"
                  width="full"
                  wrapperClassName="uk-width-1-1"
                />
              </Collapse>
              <Collapse key="username" isOpened={doesEmailExist === false} className="uk-form-row">
                <Field
                  large
                  required
                  autoComplete="name"
                  component={renderInput}
                  errorDisplay="block"
                  icon="user"
                  name="username"
                  placeholder="Username"
                  width="full"
                  wrapperClassName="uk-width-1-1"
                />
              </Collapse>
              <div className="uk-form-row">
                <Button
                  large
                  primary
                  className="uk-width-1-1 uk-form-icon"
                  disabled={submitting}
                  type="submit"
                >
                  <i
                    className={cx({
                      'uk-icon-spinner uk-icon-spin': submitting,
                      'uk-icon-chevron-right': !submitting,
                    })}
                  />
                  {
                    doesEmailExist === null ?
                    'Next' :
                    (doesEmailExist === true ? 'Login' : 'Register')
                  }
                </Button>
              </div>
              <Collapse key="remember" className="uk-form-row uk-text-small" isOpened={doesEmailExist === true}>
                <Link to="/forgot" className="uk-float-right uk-link uk-link-muted">
                  {'Forgot your password?'}
                </Link>
              </Collapse>
            </form>
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
