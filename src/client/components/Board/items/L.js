import { PropTypes } from 'react'

import cx from '../style.scss'

export const L = ({ rotated }) => <div className={cx('L', { rotated })}>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
</div>

L.propTypes = {
  rotated: PropTypes.bool.isRequired,
}
