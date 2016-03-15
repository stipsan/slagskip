'use strict'; // @TODO this is to allow let & const

// @TODO could prove to be a useful reusable module on npm

const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

const createUser = (pipeline, id, username, friends, invites, requests) => {
  const multi = pipeline.multi()
  
  multi.incr('user_next')
  multi.hset('users', username, id)
  multi.hset(`user:${id}`, 'username', username)
  
  if(friends) {
    multi.sadd(`user:${id}:friends`, friends)
  }
  if(invites) {
    multi.sadd(`user:${id}:invites`, invites)
  }
  if(requests) {
    multi.sadd(`user:${id}:requests`, requests)
  }

  return multi.exec()
}

redis.multi([
  ['get', 'migration_next'],
  ['get', 'user_next']
]).exec((err, result) => {
  const migration_next = parseInt(result[0][1] || 0, 10)
  let   user_next      = parseInt(result[1][1] || 0, 10)
  const pipeline = redis.pipeline()
  switch (migration_next) {
    case 0:
      pipeline.setnx('migration_next', 0)
    case 1:
      pipeline.setnx('user_next', 1)
    case 2:
      createUser(
        pipeline,
        ++user_next,
        'Batman',
        false,
        ['Superman']
      )
    case 3:
      createUser(
        pipeline,
        ++user_next,
        'Superman',
        false,
        ['WonderWoman'],
        ['WonderWoman', 'Batman']
      )
    case 4:
      createUser(
        pipeline,
        ++user_next,
        'WonderWoman',
        false,
        ['Superman'],
        ['Superman']
      )
  }

  pipeline.exec((err, results) => {
    const migrations = results.filter(
      migration => migration[1] !== 'QUEUED' && migration[1] !== 'OK'
    )

    if(migrations.length > 0) {
      console.info('Ran the following migrations:')
    } else {
      console.info('Nothing to migrate')
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
       console.info(key)
    }
    multi.set('migration_next', i + migration_next)
    multi.exec(() => redis.quit())
  })
})