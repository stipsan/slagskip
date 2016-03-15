var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

const INVITE_EXPIRE = 86400;

function getUserByID(id) {
  
};

function getUserByUsername(username) {
  
};

function createUser(username, success, error) {
  redis.incr('next_user_id').then(result => {
    const id = Math.max(Number(result), 1);
    
    // validate if username exists
    redis.hsetnx('users', username, id).then(result => {
      if(result === 0) return; //@TODO handle error
      
      // validate if id exists
      redis.hsetnx(`user:${id}`, 'username', username).then(result => {
        if(result === 0) return; //@TODO handle error
        
        
      });
    });
  });
};

function userInviteFriend(data, success, failure) {
  console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`});
    
    redis.sadd(`user:${id}:requests`, data.friend.username);
    redis.expire(`user:${id}:requests`, INVITE_EXPIRE);
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`});
      
      
      redis.sadd(`user:${id}:invites`, data.user.username);
      redis.expire(`user:${id}:invites`, INVITE_EXPIRE);
      success(id);
    });
  });
}

//createUser(require('faker').name.firstName(), () => {}, () => {});
/*
for (var i = 0; i < 20; i++) {
   createUser(require('faker').name.firstName(), () => {}, () => {});
}
*/

function loginUser(data, success, failure) {
  redis.hget('users', data.username).then(id => {
    if(id < 1) return failure({message: `User '${data.username}' does not exist!`});
    
    redis.multi([
      ['hgetall', 'users'],
      ['smembers', `user:${id}:invites`],
      ['smembers', `user:${id}:requests`],
      ['hset', `user:${id}`, 'online', 1],
    ]).exec((err, results) => {
      // @TODO investigate if error handling is correct here
      
      if(err) return failure(err);
      const users    = results[0][1];
      delete           users[data.username];
      const friends  = Object.keys(users).reduce(
        (previousValue, currentValue, currentIndex) => [
          ...previousValue,
          { id: users[currentValue], username: currentValue }
        ], []);        
      const invites  = results[1][1];
      const requests = results[2][1];
      
      success({
        username: data.username,
        id,
        friends,
        invites,
        requests,
      });
    });
    console.log('loginUser', data.username, id);
  });
};

function logoutUser(data, success, failure) {
  
    redis.multi([
      ['hgetall', 'users'],
      ['smembers', `invites:${id}`],
      ['smembers', `requests:${id}`],
      ['hset', `user:${id}`, 'online', 0, 'lastVisit', new Date],
    ]).exec((err, results) => {
      const users    = results[0][1];
      delete           users[data.username];
      const friends  = Object.keys(users).reduce(
        (previousValue, currentValue, currentIndex) => [
          ...previousValue,
          { id: users[currentValue], username: currentValue }
        ], []);        
      const invites  = results[1][1];
      const requests = results[2][1];
      
      success(data);
    });
    console.log('logoutUser', data.username, id);
};

module.exports = {
  getUserByID,
  getUserByUsername,
  loginUser,
  logoutUser,
  userInviteFriend,
  createUser,
};