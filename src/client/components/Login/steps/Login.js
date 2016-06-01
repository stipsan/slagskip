import { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import cx from '../style.scss'
import validate from '../validate'

const CheckEmailForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className={cx('form')}>
      <Field name="email" component={email =>
        <p className={cx('control')}>
          <input
            type="email"
            {...email}
            placeholder="E-mail"
            className={cx('input-email', { 'is-danger': email.touched && email.error })}
            autoComplete="email"
            readOnly
          />
        </p>
      } />
      <Field name="password" component={password =>
        <p className={cx('control')}>
          <input
            type="password"
            {...password}
            placeholder="Password"
            className={cx('input-email', { 'is-danger': password.touched && password.error })}
            autoComplete="password"
            autoFocus
          />
          {password.touched && password.error &&
            <span className={cx('help', 'is-danger')}>{password.error}</span>
          }
        </p>
      } />
      <p className={cx('control')}>
        <button className={cx('login-button')} type="submit">{'Log in'}</button>
      </p>
      <p className={cx('control')}>
        <a className={cx('forgot-password')}>{'Forgot your password?'}</a>
      </p>
    </form>
  )
}

CheckEmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'login',
  destroyOnUnmount: false,
  validate
})(CheckEmailForm)
