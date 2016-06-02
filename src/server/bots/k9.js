const getTurns = (botToken, getState, turnsPlayedByBot, successfullTurnsPlayedByBot) => {

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

  let lookForAvailableSpot = true
  const botTurns = []
  const pendingMoves = []
  let botSelectedCell = false
  while (lookForAvailableSpot) {

    const guessPool = [...continuePreviousHits]
    const smartGuess = 0 < guessPool.length ?
          guessPool[Math.floor(Math.random() * guessPool.length)] : false

    const randomSpot = false !== smartGuess && -1 === turnsPlayedByBot.indexOf(smartGuess) &&
        -1 === pendingMoves.indexOf(smartGuess) && smartGuess || Math.floor(Math.random() * 100)
    if (-1 === turnsPlayedByBot.indexOf(randomSpot) && -1 === pendingMoves.indexOf(randomSpot)) {
      botSelectedCell = randomSpot
      const botHit = getState().getIn(['match', 'viewerBoard', botSelectedCell])
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
      } else {
        // check neighbors, start by creating plausible next moves
        const moveUp = botSelectedCell - 10
        const moveRight = botSelectedCell + 1
        const moveDown = botSelectedCell + 10
        const moveLeft = botSelectedCell - 1
        const possibleMoves = []

        // we can go up
        if (9 < botSelectedCell) {
          if (-1 === turnsPlayedByBot.indexOf(moveUp) && -1 === pendingMoves.indexOf(moveUp)) {
            possibleMoves.push(moveUp)
          }
        }
        // right
        if (9 > (botSelectedCell % 10)) {
          if (-1 === turnsPlayedByBot.indexOf(moveRight) &&
          -1 === pendingMoves.indexOf(moveRight)) {
            possibleMoves.push(moveRight)
          }
        }
        // down
        if (90 > botSelectedCell) {
          if (-1 === turnsPlayedByBot.indexOf(moveDown) && -1 === pendingMoves.indexOf(moveDown)) {
            possibleMoves.push(moveDown)
          }
        }
        // we can go left
        if (0 < (botSelectedCell % 10)) {
          if (-1 === turnsPlayedByBot.indexOf(moveLeft) && -1 === pendingMoves.indexOf(moveLeft)) {
            possibleMoves.push(moveLeft)
          }
        }

        // Pick a random possible move, if any
        if (possibleMoves.length) {
          const possibleMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
          const extraHit = getState().getIn(['match', 'viewerBoard', possibleMove])
          pendingMoves.push(possibleMove)
          botTurns.push({
            id: botToken.id,
            index: possibleMove,
            hit: 0 !== extraHit,
            foundItem: 0 < extraHit && extraHit,
            on: new Date().getTime()
          })

          if (0 === extraHit) {
            lookForAvailableSpot = false
          } else {
            let bonusMove = false
            // we got a hit, lets try a few more spots in the same direction
            if (possibleMove === moveUp) {
              const moveUpAgain = moveUp - 10

              if (9 < moveUp) {
                if (-1 === turnsPlayedByBot.indexOf(moveUpAgain) &&
                -1 === pendingMoves.indexOf(moveUpAgain)) {
                  bonusMove = moveUpAgain
                }
              }
            }
            if (possibleMove === moveRight) {
              const moveRightAgain = moveRight + 1

              if (9 > (moveRight % 10)) {
                if (-1 === turnsPlayedByBot.indexOf(moveRightAgain) &&
                -1 === pendingMoves.indexOf(moveRightAgain)) {
                  bonusMove = moveRightAgain
                }
              }
            }
            if (possibleMove === moveDown) {
              const moveDownAgain = moveDown + 1

              if (90 > moveDown) {
                if (-1 === turnsPlayedByBot.indexOf(moveDownAgain) &&
                -1 === pendingMoves.indexOf(moveDownAgain)) {
                  bonusMove = moveDownAgain
                }
              }
            }
            if (possibleMove === moveLeft) {
              const moveLeftAgain = moveLeft - 1

              if (0 < (moveLeft % 10)) {
                if (-1 === turnsPlayedByBot.indexOf(moveLeftAgain) &&
                -1 === pendingMoves.indexOf(moveLeftAgain)) {
                  bonusMove = moveLeftAgain
                }
              }
            }

            if (bonusMove) {
              const bonusHit = getState().getIn(['match', 'viewerBoard', bonusMove])
              pendingMoves.push(bonusMove)
              botTurns.push({
                id: botToken.id,
                index: bonusMove,
                hit: 0 !== bonusHit,
                foundItem: 0 < bonusHit && bonusHit,
                on: new Date().getTime()
              })

              if (0 === bonusHit) {
                lookForAvailableSpot = false
              }
            }
          }
        }
      }
    }

    // safeguarding against fatal infinite loops
    if (98 < (botTurns.length + turnsPlayedByBot.length)) {
      lookForAvailableSpot = false
    }
  }

  return botTurns
}

const K9 = {
  getTurns,
  // k9 loves to have everything in vertical
  getRotated: () => 20 < Math.floor(Math.random() * 100),
}

export default K9
