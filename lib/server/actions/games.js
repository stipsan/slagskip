'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gamesRequest = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ActionTypes = require('../constants/ActionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gamesRequest = exports.gamesRequest = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  const games = getState().getIn(['viewer', 'games']);
  return database.getGames({
    id: authToken.id,
    games
  }, redis).then(fetchedGames => {
    const games = fetchedGames.map(game => {
      const isViewerFirst = game.players[0] === authToken.id;
      const isFriendFirst = game.players[1] === authToken.id;

      let gameState = isViewerFirst ? game.boards.length > 1 ? 'ready' : 'waiting' : game.boards.length > 1 ? 'ready' : 'setup';

      if (game.scores.indexOf(21) !== -1) {
        if (isViewerFirst) {
          gameState = game.scores[0] === 21 && game.scores[1] !== 21 ? 'victory' : 'defeat';
        } else {
          gameState = game.scores[1] === 21 ? 'victory' : 'defeat';
        }
      }

      return {
        id: game.id,
        versus: isViewerFirst ? game.players[1] : game.players[0],
        viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
        turns: game.turns,
        gameState,
        isViewerFirst,
        isFriendFirst
      };
    });
    callback(null, { type: _ActionTypes.GAMES_SUCCESS, games });
  }).catch(error => {
    console.error(_ActionTypes.GAMES_FAILURE, error);
    callback(_ActionTypes.GAMES_FAILURE, error);
  });
};