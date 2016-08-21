import cx from 'classnames'
import { PropTypes } from 'react'

const Field = ({
  input,
  meta: { asyncValidating, touched, error, submitting },
  className,
}) => (
  <div
    className={cx('uk-form-row')}
  >
    <input
      {...input}
      className={cx('uk-width-1-1 uk-form-large', {
        'is-danger': touched && error,
      })}
      autoComplete={input.name}
      disabled={submitting}
    />
    {touched && error &&
      <span className={cx('help', 'is-danger')}>{error}</span>
    }
  </div>
)

Field.propTypes = {
  asyncValidating: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  touched: PropTypes.bool,
  type: PropTypes.string,
}

export default Field
