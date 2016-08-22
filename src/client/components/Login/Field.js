import cx from 'classnames'
import Collapse from 'react-collapse'
import FieldPropTypes from 'epic-client/PropTypes/Field'
import { PropTypes } from 'react'

const Field = ({
  input,
  meta: { asyncValidating, touched, error, submitting },
  icon,
  ...custom,
}) => (
  <div className={cx('uk-form-row')}>
    <div className="uk-form-icon uk-width-1-1">
      <i className={`uk-icon-${icon || input.name}`} />
      <input
        {...input}
        {...custom}
        className={cx('uk-width-1-1 uk-form-large', {
          'uk-form-danger': touched && error,
        })}
        autoComplete={input.name}
        disabled={submitting}
      />
    </div>
    <Collapse isOpened={!!touched && !!error} className="uk-form-help-block uk-text-left">
      {error || '&nbsp;'}
    </Collapse>
  </div>
)

Field.propTypes = {
  ...FieldPropTypes,
  icon: PropTypes.string,
}

export default Field
