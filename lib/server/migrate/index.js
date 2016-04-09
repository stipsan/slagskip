'use strict'; // @TODO this is to allow let & const

const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);
const migrations = require('./migrations');

redis.hgetall('migrations').then(migrated => {
  const pending = migrations.filter(migration => {
    return !migrated.hasOwnProperty(migration[0]);
  });

  return Promise.all(pending.map(migration => migration[1](redis).then(() => {
    redis.hset('migrations', migration[0], new Date().getTime());
    return migration[0];
  })));
}).then(migrated => {
  if (!migrated.length) {
    console.log('Nothing to migrate');
  } else {
    console.log('Ran following migrations:', migrated);
  }
}).catch(reason => console.error('Migration failed:', reason));