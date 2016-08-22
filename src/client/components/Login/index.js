import cx from 'classnames'
import Collapse from 'react-collapse'
import Field from 'epic-client/components/Form/Field'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Button } from 'uikit-react'

import FieldComponent from './Field'

const formStyle = Object.freeze({
  width: '250px'
})

export default class Login extends Component {
  static propTypes = {
    createUserWithEmailAndPassword: PropTypes.func.isRequired,
    doesEmailExist: PropTypes.bool,
    isRequestPending: PropTypes.bool.isRequired,
    signInWithEmailAndPassword: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  }

  state = { password: false }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ password: true })
  }

  render() {
    const {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      doesEmailExist,
      submitting,
      valid,
    } = this.props
    const { handleSubmit } = this

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
            <form className="uk-panel uk-panel-box uk-form" onSubmit={handleSubmit}>
              <Field
                name="email"
                type="email"
                icon="envelope"
                placeholder="E-mail"
                submitting={submitting}
                component={FieldComponent}
              />
              <Collapse isOpened={doesEmailExist !== null} className="uk-form-row">
                <Field
                  name="password"
                  type="password"
                  icon="lock"
                  placeholder="Password"
                  submitting={submitting}
                  component={FieldComponent}
                />
              </Collapse>
              <Collapse isOpened={doesEmailExist === false} className="uk-form-row">
                <Field
                  name="username"
                  placeholder="Username"
                  autoComplete="name"
                  icon="user"
                  submitting={submitting}
                  component={FieldComponent}
                />
              </Collapse>
              <div className="uk-form-row">
                <Button large primary className="uk-width-1-1" type="submit">
                  {
                    doesEmailExist === null ?
                    'Next' :
                    (doesEmailExist === true ? 'Login' : 'Register')
                  }
                </Button>
              </div>
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
