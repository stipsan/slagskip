import cx from 'classnames'
import { PropTypes } from 'react'

const Field = ({
  input,
  meta: { asyncValidating, touched, error, submitting },
  className,
}) => (
  <p
    className={cx('control', `control-${input.name}`, className, {
      error: touched && error,
      'is-loading': asyncValidating,
    })}
  >
    <input
      {...input}
      className={cx(`input-${input.name}`, {
        'is-danger': touched && error,
      })}
      autoComplete="email"
      disabled={submitting}
    />
    {touched && error &&
      <span className={cx('help', 'is-danger')}>{error}</span>
    }
  </p>
)

Field.propTypes = {
  asyncValidating: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  touched: PropTypes.bool,
  type: PropTypes.string,
}

export default Field
