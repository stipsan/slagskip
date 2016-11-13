import cx from 'classnames'

const Cell = ({
  value,
  isMine,
  size
}) => (
  <div
    data-type={isMine}
    style={{ height: `${size}px`, width: `${size}px` }}
    className={cx(
      'gamecell',
      {
        cellRemaining: -1 === value,
        'is-empty': 0 === value,
        cellJackpot: 1 === value,
        cellXL: 1 === isMine,
        cellL: 2 === isMine,
        cellM: 3 === isMine || 4 === isMine,
        cellS: 5 === isMine || 6 === isMine,
        cellXS: 7 === isMine || 8 === isMine,
      }
  )}
/>
)

export default Cell
