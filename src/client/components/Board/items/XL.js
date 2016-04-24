import { PropTypes } from 'react'
import cx from '../style.scss'

export const XL = ({ rotated }) => <div className={cx('XL', { rotated })}>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
</div>

XL.propTypes = {
  rotated: PropTypes.bool.isRequired,
}
