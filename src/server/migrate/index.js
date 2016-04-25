/* eslint no-console: "off" */
/* eslint strict: ["off"] */

'use strict' // @TODO this is to allow let & const

const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL || '127.0.0.1:6379')
const migrations = require('./migrations')

redis.hgetall('migrations').then(migrated => {
  const pending = migrations.filter(migration => !migrated.hasOwnProperty(migration[0]))

  return Promise.all(
    pending.map(
      migration => migration[1](redis).then(
        () => {
          redis.hset('migrations', migration[0], new Date().getTime())
          return migration[0]
        }
      )
    )
  )
})
.then(migrated => {
  if (migrated.length) {
    console.log('Ran following migrations:', migrated)
  }
  console.log('Nothing to migrate')
})
.catch(reason => console.error('Migration failed:', reason))
