const getTurns = (botToken, getState, turnsPlayedByBot, successfullTurnsPlayedByBot, viewerBoard) => {

  
  const continuePreviousHits = []

  successfullTurnsPlayedByBot.forEach(turnIndex => {
    if(turnsPlayedByBot.indexOf(turnIndex) !== -1) {
      return
    }
    // up
    if(turnIndex > 9) {
        continuePreviousHits.push(turnIndex - 10)
    }
    if((turnIndex % 10) < 9) {
        continuePreviousHits.push(turnIndex + 1)
    }
    if(turnIndex < 90) {
        continuePreviousHits.push(turnIndex + 10)
    }
    if((turnIndex % 10) > 0) {
        continuePreviousHits.push(turnIndex - 1)
    }
  })
  const validPositions = viewerBoard.reduce((previousValidPositions, position, index) => {
    return position > 0 && turnsPlayedByBot.indexOf(index) === -1 ? [... previousValidPositions, index] : previousValidPositions
  }, [])
  
  let lookForAvailableSpot = true
  let botTurns = []
  let pendingMoves = []
  let botSelectedCell = false
  while(lookForAvailableSpot) {
    const guessPool = [...continuePreviousHits]
    const smartGuess = Math.floor(Math.random() * 70) < turnsPlayedByBot.length ?
      validPositions[Math.floor(Math.random() * validPositions.length)] : 
      (guessPool.length > 0 ? guessPool[Math.floor(Math.random() * guessPool.length)] : false)
    let randomSpot = smartGuess !== false && turnsPlayedByBot.indexOf(smartGuess) === -1 && pendingMoves.indexOf(smartGuess) === -1 && smartGuess
    if(randomSpot === false) {
      randomSpot = Math.floor(Math.random() * 100)
    }
    if(turnsPlayedByBot.indexOf(randomSpot) === -1 && pendingMoves.indexOf(randomSpot) === -1) {
      botSelectedCell = randomSpot
      const botHit = getState().getIn(['match', 'viewerBoard', botSelectedCell])
      pendingMoves.push(botSelectedCell)
      botTurns.push({ id: botToken.id, index: botSelectedCell, hit: botHit !== 0, foundItem: botHit !== 0 > 0 && botHit, on: new Date().getTime() })
      if(botHit === 0) {
        lookForAvailableSpot = false
      }
    }
    
    // safeguarding against fatal infinite loops
    if((botTurns.length + turnsPlayedByBot.length) > 98) {
      lookForAvailableSpot = false
    }
  }
  
  return botTurns
}

const Marvin = {
  getTurns,
  getRotated: () => Math.floor(Math.random() * 100) > 33,
}

export default Marvin