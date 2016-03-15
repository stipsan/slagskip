var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

// it is a bit primitive for now, but it is a good start
redis.setnx('next_user_id', 0);

redis.quit();