module.exports = [
  ['legacy', redis => redis.del(
    'migration_next', 'migration:0', 'migration:1', 'migration:2'
  )],
  ['init', redis => redis.multi([
    ['setnx', 'user_next', 0],
    ['setnx', 'game_next', 0]
  ]).exec()]
]