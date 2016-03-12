var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

redis.set('next_user_id', 1);