const getTurns = (
  botToken,
  match,
  turnsPlayedByBot,
  successfullTurnsPlayedByBot,
  viewerBoard
) => {


  const continuePreviousHits = []

  successfullTurnsPlayedByBot.forEach(turnIndex => {
    if (-1 !== turnsPlayedByBot.indexOf(turnIndex)) {
      return
    }
    // up
    if (9 < turnIndex) {
      continuePreviousHits.push(turnIndex - 10)
    }
    if (9 > (turnIndex % 10)) {
      continuePreviousHits.push(turnIndex + 1)
    }
    if (90 > turnIndex) {
      continuePreviousHits.push(turnIndex + 10)
    }
    if (0 < (turnIndex % 10)) {
      continuePreviousHits.push(turnIndex - 1)
    }
  })
  const validPositions = viewerBoard.reduce((previousValidPositions, position, index) => (
    0 < position && -1 === turnsPlayedByBot.indexOf(index) ?
    [... previousValidPositions, index] : previousValidPositions
  ), [])

  let lookForAvailableSpot = true
  const botTurns = []
  const pendingMoves = []
  let botSelectedCell = false
  while (lookForAvailableSpot) {
    // console.log(turnsPlayedByBot.length, validPositions)
    const guessPool = [...continuePreviousHits]
    const fallbackSmartGuess = 0 < guessPool.length ?
      guessPool[Math.floor(Math.random() * guessPool.length)] : false
    const smartGuess = Math.floor(Math.random() * 30) < turnsPlayedByBot.length ?
      validPositions[Math.floor(Math.random() * validPositions.length)] :
      fallbackSmartGuess
    let randomSpot = false !== smartGuess && -1 === turnsPlayedByBot.indexOf(smartGuess) &&
                    -1 === pendingMoves.indexOf(smartGuess) && smartGuess
    if (false === randomSpot) {
      randomSpot = Math.floor(Math.random() * 100)
    }
    if (-1 === turnsPlayedByBot.indexOf(randomSpot) && -1 === pendingMoves.indexOf(randomSpot)) {
      botSelectedCell = randomSpot
      const botHit = match.getIn(['viewerBoard', botSelectedCell])
      pendingMoves.push(botSelectedCell)
      botTurns.push({
        id: botToken.id,
        index: botSelectedCell,
        hit: 0 !== botHit,
        foundItem: 0 < botHit && botHit,
        on: new Date().getTime()
      })
      if (0 === botHit) {
        lookForAvailableSpot = false
      }
    }

    // safeguarding against fatal infinite loops
    if (98 < (botTurns.length + turnsPlayedByBot.length)) {
      lookForAvailableSpot = false
    }
  }

  return botTurns
}

const Hal = {
  getTurns,
  getRotated: () => 66 < Math.floor(Math.random() * 100),
}

export default Hal
