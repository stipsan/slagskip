'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGames = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const getGames = exports.getGames = (viewer, redis) => {
  (0, _invariant2.default)(viewer.id, 'Invalid viewer, missing `id` property');
  (0, _invariant2.default)(viewer.games, 'Invalid viewer, missing `games` property');

  const viewerId = viewer.id;
  const pipeline = viewer.games.reduce((previousValue, currentValue) => [].concat(_toConsumableArray(previousValue), [['hgetall', `game:${ currentValue }`]]), []);
  return redis.multi(pipeline).exec().then(results => {
    let i = 0;
    return results.reduce((previousValue, currentValue, currentIndex) => {
      const game = currentValue[1];
      if (!game.state) return previousValue;
      try {
        var _JSON$parse = JSON.parse(game.state);

        var _JSON$parse2 = _slicedToArray(_JSON$parse, 4);

        const players = _JSON$parse2[0];
        const boards = _JSON$parse2[1];
        var _JSON$parse2$ = _JSON$parse2[2];
        const turns = _JSON$parse2$ === undefined ? [] : _JSON$parse2$;
        var _JSON$parse2$2 = _JSON$parse2[3];
        const scores = _JSON$parse2$2 === undefined ? [0, 0] : _JSON$parse2$2;

        previousValue[i++] = {
          id: currentValue[1].id,
          players,
          boards,
          turns,
          scores
        };
      } catch (e) {
        console.error('failed to decode state', e);
      }
      return previousValue;
    }, []);
  });
};