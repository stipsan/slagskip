import { PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form/immutable'

import asyncValidate from '../asyncValidate'
import cx from '../style.scss'
import validate from '../validate'
import FieldComponent from '../Field'

const CheckEmailForm = props => {
  const { handleSubmit, submitting } = props
  console.log('props', props)
  return (
    <form onSubmit={handleSubmit} className={cx('form')}>
      <Field
        name="email"
        type="email"
        placeholder="E-mail"
        autoComplete="email"
        className={cx('is-marginless', 'no-bottom-rounded-border')}
        submitting={submitting}
        component={FieldComponent}
      />
      <Field
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="password"
        className="no-top-rounded-border"
        submitting={submitting}
        autoFocus
        component={FieldComponent}
      />
      <p className={cx('control')}>
        <button
          className={cx('login-button', { 'is-loading': submitting })}
          disabled={submitting}
        >{'Log in'}</button>
      </p>
      <p className={cx('control')}>
        <Link to="/forgot" className={cx('forgot-password')}>{'Forgot your password?'}</Link>
      </p>
    </form>
  )
}

CheckEmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'login',
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(CheckEmailForm)
