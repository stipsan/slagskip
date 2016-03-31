'use strict' // @TODO this is to allow let & const

// @TODO could prove to be a useful reusable module on npm
module.exports = () => {
  if(!process.env.REDIS_URL) {
    return console.error('REDIS_URL env variable missing, cannot connect to Redis and run migrations!')
  }

  const Redis = require('ioredis')
  const redis = new Redis(process.env.REDIS_URL)

  redis.get('migration_next').then(migration_next_raw => {
    const migration_next = Number(migration_next_raw)
    const pipeline = redis.pipeline()
    switch (migration_next) {
    case 0:
      pipeline.setnx('migration_next', 0)
    case 1:
      pipeline.setnx('user_next', 0)
    case 2:
      pipeline.setnx('game_next', 0)
    }

    pipeline.exec((err, results) => {
      const migrations = results.filter(
        migration => migration[1] !== 'QUEUED' && migration[1] !== 'OK'
      )

      if(migrations.length > 0) {
        console.log('Ran the following migrations:')
      } else {
        console.log('Nothing to migrate')
      }
      const multi = redis.multi(), total = migrations.length
      for (var i = 0; i < total;i++) {
        const migration = migrations[i]
        if(migration[0] !== null) {
          console.error(migration[0])
          break
        }
        if(typeof migration[1] === 'object') {
          let breakTheLoop = false
          migration[1].some(stub => {
            if(typeof stub === 'object') {
              console.error(stub)
              return breakTheLoop = true
            }
          })
          if(breakTheLoop === true) {
            break
          }
        }
        const key = `migration:${ i + migration_next }`
        multi.set(key, (new Date).toJSON())
        multi.incr('migration_next')
        console.log(key)
      }
      multi.exec()
    })
  })
}