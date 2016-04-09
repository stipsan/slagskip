'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveTurn = exports.joinGame = exports.loadGame = exports.newGame = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newGame = exports.newGame = (authToken, versusId, board, redis) => {
  (0, _invariant2.default)(authToken.id, 'Invalid authToken, missing `id` property');
  (0, _invariant2.default)(versusId, 'Invalid versusId');
  (0, _invariant2.default)(board, 'Invalid board');

  let newGameId;

  return redis.incr('game_next').then(gameId => {
    (0, _invariant2.default)(gameId, 'Failed to get game_next id');

    newGameId = gameId;

    return redis.multi([['hmset', `game:${ gameId }`, {
      id: gameId,
      state: JSON.stringify([[authToken.id, versusId], [board.grid]])
    }], ['sadd', `games:${ authToken.id }`, gameId], ['sadd', `games:${ versusId }`, gameId], ['expire', `game:${ gameId }`, 72 * 60 * 60]]).exec();
  }).then(() => newGameId);
};

const loadGame = exports.loadGame = (authToken, gameId, redis) => {
  (0, _invariant2.default)(authToken.id, 'Invalid authToken, missing `id` property');
  (0, _invariant2.default)(gameId, 'Invalid gameId when loading game');

  return redis.hgetall(`game:${ gameId }`).then(_ref => {
    let id = _ref.id;
    let state = _ref.state;

    (0, _invariant2.default)(id, '404 Game Not Found');

    var _JSON$parse = JSON.parse(state);

    var _JSON$parse2 = _slicedToArray(_JSON$parse, 4);

    const players = _JSON$parse2[0];
    const boards = _JSON$parse2[1];
    const turns = _JSON$parse2[2];
    var _JSON$parse2$ = _JSON$parse2[3];
    const scores = _JSON$parse2$ === undefined ? [0, 0] : _JSON$parse2$;


    (0, _invariant2.default)(players.indexOf(authToken.id) !== -1, 'You are not in this game!');

    return { id, boards, players, turns, scores };
  });
};

const joinGame = exports.joinGame = (authToken, gameId, board, redis) => {
  (0, _invariant2.default)(authToken.id, 'Invalid authToken, missing `id` property when joining game');
  (0, _invariant2.default)(gameId, 'Invalid gameId when joining game');

  return redis.hgetall(`game:${ gameId }`).then(_ref2 => {
    let id = _ref2.id;
    let state = _ref2.state;

    (0, _invariant2.default)(id, '404 Game Not Found');

    var _JSON$parse3 = JSON.parse(state);

    var _JSON$parse4 = _slicedToArray(_JSON$parse3, 3);

    var _JSON$parse4$ = _JSON$parse4[0];
    const players = _JSON$parse4$ === undefined ? [] : _JSON$parse4$;
    var _JSON$parse4$2 = _JSON$parse4[1];
    const boards = _JSON$parse4$2 === undefined ? [] : _JSON$parse4$2;
    var _JSON$parse4$3 = _JSON$parse4[2];
    const turns = _JSON$parse4$3 === undefined ? [] : _JSON$parse4$3;


    (0, _invariant2.default)(players.indexOf(authToken.id) !== -1, 'You are not in this game!');

    boards[1] = board.grid;

    // @TODO move to multi block
    redis.expire(`game:${ gameId }`, 72 * 60 * 60);

    return redis.hset(`game:${ gameId }`, 'state', JSON.stringify([players, boards, turns]));
  }).then(() => redis.hgetall(`game:${ gameId }`)).then(_ref3 => {
    let id = _ref3.id;
    let state = _ref3.state;

    (0, _invariant2.default)(id, '404 Game Not Found');

    var _JSON$parse5 = JSON.parse(state);

    var _JSON$parse6 = _slicedToArray(_JSON$parse5, 4);

    const players = _JSON$parse6[0];
    const boards = _JSON$parse6[1];
    const turns = _JSON$parse6[2];
    var _JSON$parse6$ = _JSON$parse6[3];
    const scores = _JSON$parse6$ === undefined ? [0, 0] : _JSON$parse6$;


    return { id, boards, players, turns, scores };
  });
};

const calcScore = grid => {
  return (grid.includes(1) ? 5 : 0) + (grid.includes(2) ? 4 : 0);
};

const saveTurn = exports.saveTurn = (authToken, gameId, turn, redis) => {
  (0, _invariant2.default)(authToken.id, 'Invalid authToken, missing `id` property');
  (0, _invariant2.default)(gameId, 'Invalid gameId when saving turn %s', gameId);
  (0, _invariant2.default)(turn, 'Invalid turn');

  return redis.hgetall(`game:${ gameId }`).then(_ref4 => {
    let id = _ref4.id;
    let state = _ref4.state;

    (0, _invariant2.default)(id, '404 Game Not Found');

    var _JSON$parse7 = JSON.parse(state);

    var _JSON$parse8 = _slicedToArray(_JSON$parse7, 3);

    const players = _JSON$parse8[0];
    const boards = _JSON$parse8[1];
    const turns = _JSON$parse8[2];


    (0, _invariant2.default)(players.indexOf(authToken.id) !== -1, 'You are not in this game!');

    turns.push(turn);

    const scoresSets = turns.reduce((previousScores, turn) => {
      // Versus opponent moves
      if (turn.id === players[0] && turn.hit) {
        previousScores[0].add(turn.index);
      } else if (turn.id === players[1] && turn.hit) {
        previousScores[1].add(turn.index);
      }

      return previousScores;
    }, [new Set(), new Set()]);
    const scores = [scoresSets[0].size, scoresSets[1].size];

    // @TODO move to multi block
    redis.expire(`game:${ gameId }`, 72 * 60 * 60);

    return redis.hset(`game:${ gameId }`, 'state', JSON.stringify([players, boards, turns, scores]));
  }).then(() => redis.hgetall(`game:${ gameId }`)).then(_ref5 => {
    let id = _ref5.id;
    let state = _ref5.state;

    (0, _invariant2.default)(id, '404 Game Not Found');

    var _JSON$parse9 = JSON.parse(state);

    var _JSON$parse10 = _slicedToArray(_JSON$parse9, 4);

    const players = _JSON$parse10[0];
    const boards = _JSON$parse10[1];
    const turns = _JSON$parse10[2];
    const scores = _JSON$parse10[3];


    return { id, boards, players, turns, scores };
  });
};