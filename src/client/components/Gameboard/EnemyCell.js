import cx from 'classnames'

const EnemyCell = ({
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
        'is-empty': 0 === value,
        'is-boo': 1 === value,
        'is-mine': isMine,
      }
    )}
/>
)

export default EnemyCell
