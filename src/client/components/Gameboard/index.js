import Cell from './Cell'
import SelectableCell from './SelectableCell'

const Gameboard = ({
  grid,
  mine,
  onSelectCell,
  selectedCell,
  size
}) => {
  const RenderCell = onSelectCell ? SelectableCell : Cell

  return (
    <div className="gameboard" style={{ height: `${size}px`, width: `${size}px` }}>
      {grid.map((value, index) => (
        <RenderCell
          key={index}
          id={index}
          isMine={mine && mine.getIn(['grid', index])}
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
