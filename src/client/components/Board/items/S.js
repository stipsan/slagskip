import { PropTypes } from 'react'

import cx from '../style.scss'

export const S = ({ rotated }) => <div className={cx('S', { rotated })}>
  <div className={cx('cell')}></div>
  <div className={cx('cell')}></div>
</div>

S.propTypes = {
  rotated: PropTypes.bool.isRequired,
}
