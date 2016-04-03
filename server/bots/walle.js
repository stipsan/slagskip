const WallE = (botToken, getState, turnsPlayedByBot) => {
  let lookForAvailableSpot = true
  let botTurns = []
  let pendingMoves = []
  let botSelectedCell = false
  while(lookForAvailableSpot) {
    let randomSpot = Math.floor(Math.random() * 100)
    if(turnsPlayedByBot.indexOf(randomSpot) === -1 && pendingMoves.indexOf(randomSpot) === -1) {
      botSelectedCell = randomSpot
      const botHit = getState().getIn(['match', 'viewerBoard', botSelectedCell])
      pendingMoves.push(botSelectedCell)
      botTurns.push({ id: botToken.id, index: botSelectedCell, hit: botHit !== 0, foundItem: botHit !== 0 > 0 && botHit, on: new Date().getTime() })
      if(botHit === 0) {
        lookForAvailableSpot = false
      } else {
        // check neighbors, start by creating plausible next moves
        const moveUp = botSelectedCell - 10
        const moveRight = botSelectedCell + 1
        const moveDown = botSelectedCell + 10
        const moveLeft = botSelectedCell - 1
        const possibleMoves = []
        
        // we can go up
        if(botSelectedCell > 9) {
          if(turnsPlayedByBot.indexOf(moveUp) === -1 && pendingMoves.indexOf(moveUp) === -1) {
            possibleMoves.push(moveUp)
          }
        }
        // right
        if((botSelectedCell % 10) < 9) {
          if(turnsPlayedByBot.indexOf(moveRight) === -1 && pendingMoves.indexOf(moveRight) === -1) {
            possibleMoves.push(moveRight)
          }
        }
        // down
        if(botSelectedCell < 90) {
          if(turnsPlayedByBot.indexOf(moveDown) === -1 && pendingMoves.indexOf(moveDown) === -1) {
            possibleMoves.push(moveDown)
          }
        }
        // we can go left
        if((botSelectedCell % 10) > 0) {
          if(turnsPlayedByBot.indexOf(moveLeft) === -1 && pendingMoves.indexOf(moveLeft) === -1) {
            possibleMoves.push(moveLeft)
          }
        }
        
        // Pick a random possible move, if any
        if(possibleMoves.length) {
          const possibleMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
          const extraHit = getState().getIn(['match', 'viewerBoard', possibleMove])
          pendingMoves.push(possibleMove)
          botTurns.push({ id: botToken.id, index: possibleMove, hit: extraHit !== 0, foundItem: extraHit !== 0 > 0 && extraHit, on: new Date().getTime() })
          
          if(extraHit === 0) {
            lookForAvailableSpot = false
          } else {
            let bonusMove = false
            // we got a hit, lets try a few more spots in the same direction
            if(possibleMove === moveUp) {
              const moveUpAgain = moveUp - 10
              
              if(moveUp > 9) {
                if(turnsPlayedByBot.indexOf(moveUpAgain) === -1 && pendingMoves.indexOf(moveUpAgain) === -1) {
                  bonusMove = moveUpAgain
                }
              } 
            }
            if(possibleMove === moveRight) {
              const moveRightAgain = moveRight + 1
              
              if((moveRight % 10) < 9) {
                if(turnsPlayedByBot.indexOf(moveRightAgain) === -1 && pendingMoves.indexOf(moveRightAgain) === -1) {
                  bonusMove = moveRightAgain
                }
              }
            }
            if(possibleMove === moveDown) {
              const moveDownAgain = moveDown + 1
              
              if(moveDown < 90) {
                if(turnsPlayedByBot.indexOf(moveDownAgain) === -1 && pendingMoves.indexOf(moveDownAgain) === -1) {
                  bonusMove = moveDownAgain
                }
              }
            }
            if(possibleMove === moveLeft) {
              const moveLeftAgain = moveLeft - 1
              
              if((moveLeft % 10) > 0) {
                if(turnsPlayedByBot.indexOf(moveLeftAgain) === -1 && pendingMoves.indexOf(moveLeftAgain) === -1) {
                  bonusMove = moveLeftAgain
                }
              } 
            }
            
            if(bonusMove) {
              const bonusHit = getState().getIn(['match', 'viewerBoard', bonusMove])
              pendingMoves.push(bonusMove)
              botTurns.push({ id: botToken.id, index: bonusMove, hit: bonusHit !== 0, foundItem: bonusHit !== 0 > 0 && bonusHit, on: new Date().getTime() })
              
              if(bonusHit === 0) {
                lookForAvailableSpot = false
              }
            }
          }
        }
      }
    }
    
    // safeguarding against fatal infinite loops
    if((botTurns.length + turnsPlayedByBot.length) > 98) {
      lookForAvailableSpot = false
    }
  }
  
  return botTurns
}

export default WallE