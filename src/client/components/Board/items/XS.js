import { PropTypes } from 'react'

import cx from '../style.scss'

export const XS = ({ rotated }) => <div className={cx('XS', { rotated })}>
  <div className={cx('cell')}></div>
</div>

XS.propTypes = {
  rotated: PropTypes.bool.isRequired,
}
