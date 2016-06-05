import { PropTypes } from 'react'

import cx from './style.scss'

const Field = ({
 ...props
}) => (
  <p className={cx('control', 'control-email')}>
    <input
      {...props}
      placeholder="E-mail"
      className={cx('input-email', { 'is-danger': props.touched && props.error })}
      autoComplete="email"
    />
    {props.touched && props.error &&
      <span className={cx('help', 'is-danger')}>{props.error}</span>
    }
  </p>
)

Field.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  touched: PropTypes.bool,
}

export default Field
