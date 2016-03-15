'use strict'; // @TODO this is to allow let & const

// @TODO could prove to be a useful reusable module on npm

const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

redis.get('next_migration_id', (err, result) => {
  const id = parseInt(result || 0, 10)
  const pipeline = redis.pipeline();
  console.log('id', err, result, id);
  switch (id) {
    case 0:
      pipeline.setnx('next_migration_id', 0)
    case 1:
      pipeline.set('Heidi', 'OKs')
    case 2:
      pipeline.setnx('next_user_id', 1)
    case 3:
      pipeline.multi().set('foo', 'bar').sadd('Heidi', 'OKs').get('foo').exec()
    case 4:
      pipeline.setnx('Stian', new Set([1,2,3]))
    case 5:
      pipeline.sadd('Heidi', 'OKs')
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
    for (var i = id, total = migrations.length; i < total; i++) {
       const migration = migrations[i]
       if(migration[0] !== null) {
         console.error(migration[0])
         break
       }
       console.log('next_migration', i, migration)
       multi.incr('next_migration_id').set(`migration:${i}`, new Date)
       // @TODO break on null
       // more statements
       
    }
    
    
    redis.quit()
  })
})