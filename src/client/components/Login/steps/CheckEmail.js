import cx from 'classnames'
import { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

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
        submitting={submitting}
        autoFocus
        component={FieldComponent}
      />
      <p className={cx('control')}>
        <button
          className={cx('next-button', { 'is-loading': submitting })}
          type="submit"
        >{'Next'}</button>
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
