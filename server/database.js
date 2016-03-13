var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

function mapUserToObject(username) {
  return {
    username
  };
}

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
    
    redis.sadd(`requests:${id}`, data.friend.username);
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`});
      
      
      redis.sadd(`invites:${id}`, data.user.username);
    });
  });
}

//createUser(require('faker').name.firstName(), () => {}, () => {});

function loginUser(data, success, failure) {
  redis.hget('users', data.username).then(id => {
    if(id < 1) return failure({message: `User '${data.username}' does not exist!`});
    
    redis.multi([
      ['hkeys', 'users'],
      ['smembers', `invites:${id}`],
      ['smembers', `requests:${id}`],
    ]).exec((err, results) => {
      const friends  = results[0][1].filter(user => user !== data.username).map(mapUserToObject);
      const invites  = results[1][1];
      const requests = results[2][1];
      console.log('redis.multi', results, ['smembers', `invites:${id}`],
      ['smembers', `requests:${id}`]);
      
      success({
        username: data.username,
        friends,
        invites,
        requests,
      });
    });
    console.log('loginUser', data.username, id);
  });
};

module.exports = {
  getUserByID,
  getUserByUsername,
  loginUser,
  userInviteFriend,
};