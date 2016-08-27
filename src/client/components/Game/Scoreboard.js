
const Scoreboard = ({
  players
}) => {
  console.log(players)
  return (
    <div className="tm-scoreboard uk-margin-top">
      <ul className="uk-list uk-list-line uk-margin-bottom-remove">
        {players.map((player, i) => (
          <li key={player.id}>
            <span className="tm-scoreboard-position">
              {!i ? <span><strong>1</strong><sup>st</sup></span> : <span><strong>2</strong><sup>nd</sup></span>}
            </span>
            <span className="tm-scoreboard-username">{player.username}</span>
            <span className="tm-scoreboard-score">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Scoreboard
