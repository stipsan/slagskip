import { PropTypes } from 'react'

import cx from './style.scss'

const Field = ({
  input,
  meta,
  ...custom,
  asyncValidating,
  touched,
  error,
  submitting,
  className,
 ...props
}) => (
  <p
    className={cx('control', `control-${custom.name}`, className, {
      error: meta.touched && meta.error,
      'is-loading': meta.asyncValidating,
    })}
  >
    <input
      {...input}
      className={cx(`input-${input.props.name}`, {
        'is-danger': touched && error,
      })}
      autoComplete="email"
      disabled={meta.submitting}
    />
    {meta.touched && meta.error &&
      <span className={cx('help', 'is-danger')}>{meta.error}</span>
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
