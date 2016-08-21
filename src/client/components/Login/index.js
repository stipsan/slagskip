import Field from 'epic-client/components/Form/Field'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import FieldComponent from './Field'

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
    submitting: PropTypes.bool,
  }

  render() {
    const {
      checkIfEmailExists,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      doesEmailExist,
      submitting,
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
            <form className="uk-panel uk-panel-box uk-form">
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                submitting={submitting}
                component={FieldComponent}
              />
              <button>Submit</button>
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
