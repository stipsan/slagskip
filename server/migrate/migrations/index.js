'use strict'

module.exports = [
  ['legacy', redis => redis.del(
    'migration_next', 'migration:0', 'migration:1', 'migration:2'
  )],
  ['init', redis => redis.multi([
    ['setnx', 'user_next', 0],
    ['setnx', 'game_next', 0]
  ]).exec()],
  ['games_expire', redis => new Promise(
    (resolve, reject) => {
      const stream = redis.scanStream({
        match: 'game:*',
        // returns approximately 100 elements per call
        count: 100
      });
      let keys = [];
      stream.on('data', resultKeys => {
        redis.multi(resultKeys.map(key => ['expire', key, 72 * 60 * 60])).exec()
      });
      stream.on('end', function () {
        resolve()
      });
    }
  )]
]