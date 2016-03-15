var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

console.log('migration started');

console.log('it is a bit primitive for now, but it is a good start :-)');
redis.set('next_user_id', 1);



setTimeout(() => console.log('About to complete'), 1000);

setTimeout(() => process.exit(), 2000);