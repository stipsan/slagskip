var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

function getUserByID(id) {
  
}

function getUserByUsername(username) {
  
}

module.exports = {
  getUserByID,
  getUserByUsername
};