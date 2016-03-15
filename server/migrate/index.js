'use strict'; // @TODO this is to allow let & const

// @TODO could prove to be a useful reusable module on npm

const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

const createUser = (pipeline, id, username, friends, invites, requests) => {
  const multi = pipeline.multi()
  
  //multi.hset('users', username, id)
  //multi.hset()
  return [
    ['hset', 'users', username, id],
    ['hset', `user:${id}`, 'username', username],
    friends && ['sadd', `user:${id}:friends`, friends],
    invites && ['sadd', `user:${id}:invites`, invites],
    requests && ['sadd', `user:${id}:requests`, requests],
  ].filter(arg => !!arg)
}

redis.multi([
  ['get', 'next_migration_id'],
  ['get', 'next_user_id']
]).exec((err, result) => {
  const next_migration_id = parseInt(result[0][1] || 0, 10)
  let   next_user_id      = parseInt(result[1][1] || 0, 10)
  const pipeline = redis.pipeline();
  console.log('before switch', err, result, next_migration_id, next_user_id);
  switch (next_migration_id) {
    case 0:
      pipeline.setnx('next_migration_id', 0)
    case 1:
      pipeline.setnx('next_user_id', 1)
    case 2:
    console.log('createUser',createUser(
      next_user_id++,
      'Batman'
    ))
      pipeline.multi(createUser(
        pipeline,
        next_user_id++,
        'Batman'
      )).exec()
    case 3:
      pipeline.multi().set('foo', 'bar').sadd('Heidis', 'OKs').get('foo').exec()
    case 4:
      pipeline.setnx('Stian', new Set([1,2,3]))
    case 5:
      pipeline.sadd('Heidis', 'OKs')
    case 5:
      pipeline.set('foobar', 'barfoo')
  }
  pipeline.exec((err, results) => {
    const migrations = results.filter(
      migration => migration[1] !== 'QUEUED'
    )
    /*
    const next_migration_id = results.reduce((previous, current) =>
      current[0] === null &&
      current[1] !== 'OK' &&
      current[1] !== 'QUEUED' ?
        ++previous :
        previous,
      0
    );
    //*/
    const multi = redis.multi()
    for (var i = next_migration_id, total = migrations.length; i < total; i++) {
       const migration = migrations[i]
       if(migration[0] !== null) {
         console.error(migration[0])
         break
       }
       console.log('next_migration', migration)
       multi.incr('next_migration_id').set(`migration:${i}`, new Date)
       // @TODO break on null
       // more statements
       
    }
    console.log(i);
    
    
    
  })
})