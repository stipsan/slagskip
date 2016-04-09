'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireCannon = exports.joinGame = exports.newGame = exports.loadGame = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ActionTypes = require('../constants/ActionTypes');

var _board = require('../reducers/board');

var _bots = require('../bots');

var _bots2 = _interopRequireDefault(_bots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const loadGame = exports.loadGame = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.loadGame(authToken, action.id, redis).then(game => {
    (0, _invariant2.default)(game.id, 'Requires gameId to be returned');

    const isViewerFirst = game.players[0] === authToken.id;
    const isFriendFirst = game.players[1] === authToken.id;

    (0, _invariant2.default)(isViewerFirst !== isFriendFirst, 'Both players cannot be first! First: %s Last: %s authToken: %s', game.players[0], game.players[1], authToken.id);

    let gameState = game.boards.length > 1 ? 'ready' : isViewerFirst ? 'waiting' : 'setup';

    if (game.scores.indexOf(21) !== -1) {
      if (isViewerFirst) {
        gameState = game.scores[0] === 21 && game.scores[1] !== 21 ? 'victory' : 'defeat';
      } else {
        gameState = game.scores[1] === 21 ? 'victory' : 'defeat';
      }
    }

    dispatch({
      type: _ActionTypes.LOAD_GAME_SUCCESS,
      id: game.id,
      versus: isViewerFirst ? game.players[1] : game.players[0],
      viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
      versusBoard: isViewerFirst ? game.boards[1] : game.boards[0],
      turns: game.turns,
      gameState,
      isViewerFirst,
      viewerScore: isViewerFirst ? game.scores[0] : game.scores[1],
      versusScore: isViewerFirst ? game.scores[1] : game.scores[0],
      hits: []
    });
    callback(null, {
      type: _ActionTypes.LOAD_GAME_SUCCESS,
      id: game.id,
      versus: isViewerFirst ? game.players[1] : game.players[0],
      viewerBoard: isViewerFirst ? game.boards[0] : game.boards[1],
      turns: game.turns,
      viewerScore: isViewerFirst ? game.scores[0] : game.scores[1],
      versusScore: isViewerFirst ? game.scores[1] : game.scores[0],
      gameState,
      isViewerFirst,
      isFriendFirst
    });
  }).catch(error => {
    console.error(_ActionTypes.LOAD_GAME_FAILURE, error);
    callback(_ActionTypes.LOAD_GAME_FAILURE, error.message || error);
  });
};

const newGame = exports.newGame = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.newGame(authToken, action.versus, action.board, redis).then(gameId => {
    (0, _invariant2.default)(gameId, 'Failed to create new game');

    // We have a game versus a bot!
    if (_bots2.default.hasOwnProperty(action.versus)) {
      const botToken = {
        id: action.versus
      };
      const botBoard = (0, _board.board)(undefined, { type: _ActionTypes.RANDOM_ITEMS, getRotated: _bots2.default[action.versus].getRotated });

      return database.joinGame(botToken, gameId, botBoard.toJS(), redis).then(game => {
        (0, _invariant2.default)(game.id, 'Bot failed to join game');

        const isViewerFirst = true;
        const versus = isViewerFirst ? game.players[1] : game.players[0];

        // notify human
        callback(null, {
          type: _ActionTypes.NEW_GAME_SUCCESS,
          id: gameId,
          versus: botToken.id
        });

        // notify human that game is ready
        socket.exchange.publish(`user:${ authToken.id }`, {
          type: _ActionTypes.RECEIVE_JOIN_GAME,
          id: gameId
        });
      }).catch(error => {
        console.error(_ActionTypes.JOIN_GAME_FAILURE, error);
        callback(_ActionTypes.JOIN_GAME_FAILURE, error.message || error);
      });
    }

    callback(null, {
      type: _ActionTypes.NEW_GAME_SUCCESS,
      id: gameId,
      versus: action.versus
    });

    socket.exchange.publish(`user:${ action.versus }`, {
      type: _ActionTypes.RECEIVE_NEW_GAME,
      id: gameId,
      versus: authToken.id
    });
  }).catch(error => {
    console.error(_ActionTypes.NEW_GAME_FAILURE, error);
    callback(_ActionTypes.NEW_GAME_FAILURE, error.message || error);
  });
};

const joinGame = exports.joinGame = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  return database.joinGame(authToken, action.game, action.board, redis).then(game => {
    (0, _invariant2.default)(game.id, 'Failed to join game');

    const isViewerFirst = game.players[0] === authToken.id;
    const versus = isViewerFirst ? game.players[1] : game.players[0];

    callback(null, {
      type: _ActionTypes.JOIN_GAME_SUCCESS,
      id: game.id
    });

    socket.exchange.publish(`user:${ versus }`, {
      type: _ActionTypes.RECEIVE_JOIN_GAME,
      id: game.id
    });
  }).catch(error => {
    console.error(_ActionTypes.JOIN_GAME_FAILURE, error);
    callback(_ActionTypes.JOIN_GAME_FAILURE, error.message || error);
  });
};

const fireCannon = exports.fireCannon = (action, callback, socket, database, redis) => (dispatch, getState) => {
  const authToken = socket.getAuthToken();
  const selectedCell = action.selectedCell;


  const hit = getState().getIn(['match', 'versusBoard', selectedCell]);

  // Something went wrong
  if (hit === -1 || hit === undefined) {
    const error = 'Game data is missing';
    console.error(_ActionTypes.FIRE_CANNON_FAILURE, error);
    return callback(_ActionTypes.FIRE_CANNON_FAILURE, error);
  }

  const turn = { id: authToken.id, index: selectedCell, hit: hit !== 0, foundItem: hit !== 0 > 0 && hit, on: new Date().getTime() };

  return database.saveTurn(authToken, action.id, turn, redis).then(game => {
    callback(null, {
      type: _ActionTypes.FIRE_CANNON_SUCCESS,
      isViewerTurn: hit !== 0,
      viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
      id: action.id,
      turn
    });
    dispatch({
      type: _ActionTypes.FIRE_CANNON_SUCCESS,
      viewerScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
      id: action.id,
      turn,
      hit,
      hits: []
    });
    socket.exchange.publish(`user:${ getState().getIn(['game', 'versus']) }`, {
      type: hit !== 0 ? _ActionTypes.RECEIVE_HIT : _ActionTypes.RECEIVE_MISS,
      versusScore: game.players[0] === authToken.id ? game.scores[0] : game.scores[1],
      id: action.id,
      turn
    });

    if (_bots2.default.hasOwnProperty(game.players[1]) && hit === 0 && game.scores[0] < 21) {

      const getBotTurns = _bots2.default[game.players[1]].getTurns;
      const botToken = { id: game.players[1] };
      console.log('starting bot turn', botToken);
      let turnsPlayedByBot = game.turns.reduce((turnsByBot, turn) => {
        return turn.id === botToken.id ? [].concat(_toConsumableArray(turnsByBot), [turn.index]) : turnsByBot;
      }, []);
      let successfullTurnsPlayedByBot = game.turns.reduce((turnsByBot, turn) => {
        return turn.id === botToken.id && turn.hit ? [].concat(_toConsumableArray(turnsByBot), [turn.index]) : turnsByBot;
      }, []);

      if (turnsPlayedByBot.length === 99) return false; // game over

      const viewerBoard = getState().getIn(['match', 'viewerBoard']);
      const botTurns = getBotTurns(botToken, getState, turnsPlayedByBot, successfullTurnsPlayedByBot, viewerBoard);

      botTurns.forEach((botTurn, index) => {
        // lets timeout the response so the user is able to notice the bot already responded
        setTimeout(function (botTurn) {
          database.saveTurn(botToken, action.id, botTurn, redis).then(game => {

            socket.exchange.publish(`user:${ authToken.id }`, {
              type: botTurn.hit ? _ActionTypes.RECEIVE_HIT : _ActionTypes.RECEIVE_MISS,
              versusScore: game.scores[1],
              id: action.id,
              turn: botTurn
            });
          }).catch(error => {
            // @TODO type should be RECEIVE_BOT_FAILURE
            console.error(_ActionTypes.FIRE_CANNON_FAILURE, error);

            socket.exchange.publish(`user:${ authToken.id }`, {
              type: _ActionTypes.FIRE_CANNON_FAILURE,
              data: error.message || error
            });
          });
        }.bind(undefined, botTurn), 1000 * (index + 1));
      });
    }
  }).catch(error => {
    console.error(_ActionTypes.FIRE_CANNON_FAILURE, error);
    callback(_ActionTypes.FIRE_CANNON_FAILURE, error.message || error);
  });
};