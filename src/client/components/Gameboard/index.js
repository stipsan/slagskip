import EnemyCell from './EnemyCell'
import ViewerCell from './ViewerCell'

const Gameboard = ({
  grid,
  mine,
  onSelectCell,
  selectedCell,
  size
}) => {
  const Cell = onSelectCell ? ViewerCell : EnemyCell

  return (
    <div className="gameboard" style={{ height: `${size}px`, width: `${size}px` }}>
      {grid.map((value, index) => (
        <Cell
          key={index}
          id={index}
          isMine={mine && mine.getIn(['grid', index]) > 0}
          value={value}
          size={size / 10}
          onSelectCell={onSelectCell}
          selected={selectedCell === index}
        />
      ))}
    </div>
  )
}

Gameboard.defaultProps = {
  size: 320,
  selectedCell: false
}

export default Gameboard
