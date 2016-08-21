import cx from 'classnames'
import Collapse from 'react-collapse'
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
        'uk-form-danger': touched && error,
      })}
      autoComplete={input.name}
      disabled={submitting}
    />
    <Collapse isOpened={touched && error} springConfig={{ stiffness: 210, damping: 20 }}>
      <p className="uk-form-help-block">{error}</p>
    </Collapse>
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
