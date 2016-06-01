import { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import cx from '../style.scss'
import validate from '../validate'

const CheckEmailForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit} className={cx('form')}>
      <Field name="email" component={email =>
        <p className={cx('control', 'control-email', { error: email.touched && email.error })}>
          <input
            type="email"
            {...email}
            placeholder="E-mail"
            className={cx('input-email', { 'is-danger': email.touched && email.error })}
            autoComplete="email"
            readOnly={submitting}
            autoFocus
          />
          <span className={cx('help', 'is-danger')}>{email.error}</span>
        </p>
      } />
      <p className={cx('control')}>
        <button className={cx('next-button', { 'is-loading': submitting })} type="submit">{'Next'}</button>
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
  validate
})(CheckEmailForm)
