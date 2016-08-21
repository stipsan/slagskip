import cx from 'classnames'
import { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import asyncValidate from '../asyncValidate'
import validate from '../validate'
import FieldComponent from '../Field'

const CheckEmailForm = props => {
  const { handleSubmit, submitting } = props
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
        className={cx('is-marginless', 'no-rounded-border')}
        submitting={submitting}
        autoFocus
        component={FieldComponent}
      />
      <Field
        name="username"
        type="text"
        placeholder="Username"
        autoComplete="name"
        className="no-top-rounded-border"
        submitting={submitting}
        component={FieldComponent}
      />
      <p className={cx('control')}>
        <button className={cx('register-button', { 'is-loading': submitting })} type="submit">{'Sign up'}</button>
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
