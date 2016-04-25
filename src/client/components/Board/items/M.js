import { PropTypes } from 'react'

import cx from '../style.scss'

export const M = ({ rotated }) => <div className={cx('M', { rotated })}>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
</div>

M.propTypes = {
  rotated: PropTypes.bool.isRequired,
}
