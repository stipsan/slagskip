'use strict';

module.exports = [['legacy', redis => redis.del('migration_next', 'migration:0', 'migration:1', 'migration:2')], ['init', redis => redis.multi([['setnx', 'user_next', 0], ['setnx', 'game_next', 0]]).exec()], ['games_expire', redis => new Promise((resolve, reject) => {
  const stream = redis.scanStream({ match: 'game:*' });
  stream.on('data', keys => {
    redis.multi(keys.map(key => ['expire', key, 72 * 60 * 60])).exec();
  });
  stream.on('end', function () {
    resolve();
  });
})], ['games_set_key_rename', redis => new Promise((resolve, reject) => {
  const stream = redis.scanStream({ match: 'user:*:games' });
  stream.on('data', keys => {
    redis.multi(keys.map(key => ['rename', key, key.replace(':games', '').replace('user:', 'games:')])).exec();
  });
  stream.on('end', function () {
    resolve();
  });
})]];