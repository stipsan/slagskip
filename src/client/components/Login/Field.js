import { PropTypes } from 'react'

import cx from './style.scss'

const Field = ({
  asyncValidating,
  touched,
  error,
  submitting,
  className,
 ...props
}) => (
  <p
    className={cx('control', `control-${props.name}`, className, {
      error: touched && error,
      'is-loading': asyncValidating,
    })}
  >
    <input
      {...props}
      className={cx(`input-${props.name}`, {
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
