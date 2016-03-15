// @TODO could prove to be a useful reusable module on npm

var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

// it is a bit primitive for now, but it is a good start
redis.setnx('next_user_id', 0);

/* later, let's do something like this for real migrations
redis.get('last_migration', id => {
  let batch = [];
  switch (id) {
    default:
      
  }
    batch.push()
    
})

*/

redis.quit();