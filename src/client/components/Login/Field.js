import { PropTypes } from 'react'

import cx from './style.scss'

const Field = (props) => {
  const {
    asyncValidating,
    touched,
    error,
    className,
    input,
 } = props
  console.log('<FieldComponent />', props)
  return (
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
      disabled={input.submitting}
    />
    {touched && error &&
      <span className={cx('help', 'is-danger')}>{error}</span>
    }
  </p>
) }

Field.propTypes = {
  asyncValidating: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
}

export default Field
