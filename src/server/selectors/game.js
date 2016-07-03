
export const getVersusCell = (state, selectedCell) =>
  state.getIn(['match', 'versusBoard', selectedCell])

export const getMatch = state => state.get('match')
