import { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import cx from '../style.scss'
import validate from '../validate'

const CheckEmailForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit} className={cx('form')}>
      <Field name="email" component={email =>
        <p
          className={cx('control', 'control-email', 'is-marginless', { 'no-bottom-rounded-border': !email.error, error: email.error })}
        >
          <input
            type="email"
            {...email}
            placeholder="E-mail"
            className={cx('input-email', { 'is-danger': email.touched && email.error })}
            autoComplete="email"
          />
          {email.touched && email.error &&
            <span className={cx('help', 'is-danger')}>{email.error}</span>
          }
        </p>
      } />
      <Field name="password" component={password =>
        <p
          className={cx('control', 'is-marginless', { 'no-rounded-border': !password.touched || !password.error })}
        >
          <input
            type="password"
            {...password}
            placeholder="Password"
            className={cx('input-password', { 'is-danger': password.touched && password.error })}
            autoComplete="password"
          />
          {password.touched && password.error &&
            <span className={cx('help', 'is-danger')}>{password.error}</span>
          }
        </p>
      } />
      <Field name="username" component={username =>
        <p className={cx('control', 'no-top-rounded-border')}>
          <input
            type="username"
            {...username}
            placeholder="Username"
            className={cx('input-username', { 'is-danger': username.touched && username.error })}
            autoComplete="name"
          />
          {username.touched && username.error &&
            <span className={cx('help', 'is-danger')}>{username.error}</span>
          }
        </p>
      } />
      <p className={cx('control')}>
        <button className={cx('register-button', { 'is-loading': submitting })} type="submit">{'Sign up'}</button>
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
