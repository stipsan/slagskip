
export const getVersusCell = (state, selectedCell) =>
  state.getIn(['match', 'versusBoard', selectedCell])
