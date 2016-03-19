var Redis = require('ioredis')
var redis = new Redis(process.env.REDIS_URL)

const INVITE_EXPIRE = 86400

function getUserByID(id) {
  return { id }
}

function getUserByUsername(username) {
  return { username }
}

function createUser(username, success, failure) {
  redis.incr('user_next').then(result => {
    const id = Math.max(Number(result), 1)
    
    // validate if username exists
    redis.hsetnx('users', username, id).then(result => {
      if(result === 0) return failure({message: `User '${username}' already exists!`})
      
      // validate if id exists
      redis.hsetnx(`user:${id}`, 'username', username).then(result => {
        if(result === 0) return failure({message: `User id '${id}' already taken by another user!`})
        
        
      })
    })
  })
}

function userInviteFriend(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.sadd(`user:${id}:requests`, data.friend.username)
    redis.expire(`user:${id}:requests`, INVITE_EXPIRE)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.sadd(`user:${id}:invites`, data.user.username)
      redis.expire(`user:${id}:invites`, INVITE_EXPIRE)
      success(id)
    })
  })
}

function userAcceptInvite(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.sadd(`user:${id}:invites`, data.friend.username)
    redis.expire(`user:${id}:invites`, INVITE_EXPIRE)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.sadd(`user:${id}:requests`, data.user.username)
      redis.expire(`user:${id}:requests`, INVITE_EXPIRE)
      success(id)
    })
  })
}

function userCancelInvite(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.srem(`user:${id}:requests`, data.friend.username)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.srem(`user:${id}:invites`, data.user.username)
      success(id)
    })
  })
}

function userDeclineInvite(data, success, failure) {
  //console.log('userInviteFriend', data);
  redis.hget('users', data.user.username).then(id => {
    if(id < 1) return failure({message: `User '${data.user.username}' does not exist!`})
    
    redis.srem(`user:${id}:invites`, data.friend.username)
    redis.hget('users', data.friend.username).then(id => {
      if(id < 1) return failure({message: `Friend '${data.friend.username}' does not exist!`})
      
      
      redis.srem(`user:${id}:requests`, data.user.username)
      success(id)
    })
  })
}

//createUser(require('faker').name.firstName(), () => {}, () => {});

/*
for (var i = 0; i < 2; i++) {
   createUser(require('faker').name.firstName(), () => {}, () => {});
}
//*/


function fetchUser(id, data, success, failure) {
  redis.multi([
    ['hgetall', 'users'],
    ['smembers', `user:${id}:invites`],
    ['smembers', `user:${id}:requests`],
    ['hset', `user:${id}`, 'online', 1],
  ]).exec((err, results) => {
    // @TODO investigate if error handling is correct here
    if(err) return failure(err)

    const users    = results[0][1]
    const invites  = results[1][1]
    const requests = results[2][1]

    // exclude our own user from the friends list
    delete users[data.username]

    const hgetallFriends = Object.keys(users).reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        ['hgetall', `user:${users[currentValue]}`],
      ], [])
    //console.log('hgetallFriends', hgetallFriends);
    redis.multi(hgetallFriends).exec((err, hgetallFriendsResults) => {
      // @TODO investigate if error handling is correct here
      if(err) return failure(err)
      
      const friends = hgetallFriendsResults.reduce(
        (previousValue, currentValue, index) => [
          ...previousValue,
          Object.assign(currentValue[1], {id: users[index]}),
        ], [])
      //console.log('hgetallFriends.multi', friends);
      
      success({
        username: data.username,
        id,
        friends,
        invites,
        requests,
        online: true,
      })
    })
  })
}

function loginUser(data, success, failure) {
  redis.hget('users', data.username).then(id => {
    
    if(id < 1) {
      return createUser(data.username, id => fetchUser(id, data, success, failure), failure)
    }
    
    fetchUser(id, data, success, failure)
    //@TODO
    //if(id < 1) return failure({message: `User '${data.username}' does not exist!`});
    
    
    //console.log('loginUser', data.username, id);
  })
}

function logoutUser(data, success, failure) {
  redis.hget('users', data.username).then(id => {
    if(id < 1) return failure({message: `User '${data.username}' does not exist!`})

    const lastVisit = new Date().toJSON()
    redis.multi([
      ['hmset', `user:${id}`, 'online', 0, 'lastVisit', lastVisit],
    ]).exec(err => {
      if(err) return failure(err)

      success({
        username: data.username,
        online: false,
        lastVisit,
      })
    })
  })
}

module.exports = {
  getUserByID,
  getUserByUsername,
  loginUser,
  logoutUser,
  userInviteFriend,
  userCancelInvite,
  userDeclineInvite,
  userAcceptInvite,
  createUser,
}