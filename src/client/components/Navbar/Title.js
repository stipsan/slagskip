import { PropTypes } from 'react'

import cx from 'classnames'

const Title = ({ children }) => <h1 className={cx('headerTitle')}>
  {children}
</h1>

Title.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Title
