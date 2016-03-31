import expect from 'expect'
import { game as reducer } from '../../../shared/reducers/game'
import { board } from '../../../shared/reducers/board'
import * as types from '../../../shared/constants/ActionTypes'

const mockGame = {
  id: 1,
  opponent: 3,
  board: [
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 0,
    0, 2, 2, 2, 2, 0, 0, 0, 3, 0,
    0, 0, 1, 1, 1, 1, 1, 0, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    4, 4, 4, 0, 0, 5, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 5, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 6, 6, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
  ],
  turns: [
    
  ]
}

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      {
        id: null,
        versus: null,
        versusGrid: [
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        ],
        viewerGrid: [
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        ],
        viewerBoard: board(undefined, {}).toJS(),
        turns: [],
        isViewerFirst: null,
        isViewerTurn: false,
        gameState: 'standby', // loading | failed | setup | waiting | ready | victory | defeat
        reasonFailed: null,
        selectedCell: -1,
        viewerScore: 0,
        versusScore: 0,
      }
    )
  })
})