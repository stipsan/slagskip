/*eslint no-console: [2, { allow: ["error"] }] */

module.exports = function(worker){
  
  const scServer = worker.scServer

  require('./middleware')(worker.getSCServer())  
  
  const database = require('../database')
  const TYPES = require('../../constants/ActionTypes')
  
  //@TODO implement a persistent datastore, likely redis, for users and use dataloader

  scServer.on('connection', function(socket){
    
    //console.log(process.pid, 'a user connected', authToken);

    socket.on(TYPES.LOGIN_REQUEST, function (data, res) {
      //console.log(TYPES.LOGIN_REQUEST, data);
      
      // @TODO reuse http status code as error code for failed validation?
      if(data.username.length < 3) return res('USERNAME_TOO_SHORT', {message: 'Username too short'})
      
      database.loginUser(
        {username: data.username, socket: socket.id},
        user => {          
          //console.log(TYPES.LOGIN_SUCCESS, user);
          res(null, Object.assign({type: TYPES.LOGIN_SUCCESS}, user))
          socket.setAuthToken({username: data.username, channels: ['service', `user:${user.id}`], id: user.id})
          //socket.broadcast.emit('join', data);
          scServer.exchange.publish('service', {
            type: TYPES.RECEIVE_FRIEND_NETWORK_STATUS,
            username: user.username,
            id: user.id,
            online: true,
          })
        },
        error => {
          //console.log(TYPES.LOGIN_FAILURE, error);
          res(TYPES.LOGIN_FAILURE, error)
        }
      )
    })
    
    /*
    socket.on(TYPES.LOGIN_REQUEST, function(data) {
      
      console.log('join', data);
      if(data.username.length < 3) return socket.emit('failed login', {message: 'Username too short'});
      
      database.loginUser(
        {username: data.username, socket: socket.id},
        user => {
          idToUsername[socket.id] = data.username;
          
          console.log('loginUser', user);
          socket.emit('successful login', {
            friends: user.friends,
            viewer: user
          });
          //socket.broadcast.emit('join', data);
        },
        error => {
          socket.emit('failed login', error);
        }
      );
    });
    //*/

    socket.on(TYPES.GAME_INVITE_REQUEST, function(friend, res) {
      //console.log('invite', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username
      database.userInviteFriend({
        user: {username},
        friend,
      }, id => {
        //console.log('userInviteFriend', friend, `user:${id}`);
        scServer.exchange.publish(`user:${id}`, {
          type: TYPES.RECEIVE_GAME_INVITE,
          username: socket.authToken.username,
        })
        res(null, friend)
        
      }, err => {
        res(TYPES.GAME_INVITE_FAILURE, err)
      })
    })
    
    socket.on(TYPES.CANCEL_GAME_INVITE_REQUEST, function(friend, res) {
      //console.log('decline', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username
      scServer.exchange.publish(`user:${friend.id}`, {
        type: TYPES.RECEIVE_GAME_INVITE_CANCELLED,
        username,
      })
      res(null, friend)
    })
    socket.on(TYPES.DECLINE_GAME_INVITE_REQUEST, function(friend, res) {
      //console.log('decline', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username
      scServer.exchange.publish(`user:${friend.id}`, {
        type: TYPES.RECEIVE_GAME_INVITE_DECLINED,
        username,
      })
      res(null, friend)
    })
    socket.on(TYPES.ACCEPT_GAME_INVITE_REQUEST, function(friend, res) {
      //console.log('accept', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username
      scServer.exchange.publish(`user:${friend.id}`, {
        type: TYPES.RECEIVE_GAME_INVITE_ACCEPTED,
        username,
      })
      res(null, friend)
    })
    
    socket.on(TYPES.LOGOUT_REQUEST, function (user, res) {
      if(!socket.authToken) return res('NO_SESSION', {message: 'You can\'t logout without being logged in, buddy'})
      const username = socket.authToken.username
      //console.log(TYPES.LOGOUT_REQUEST, username);
      database.logoutUser(
        { username },
        data => {
          //console.log(TYPES.LOGOUT_SUCCESS, data);
          res(null, { username })
          scServer.exchange.publish(
            'service',
            Object.assign(
              { type: TYPES.RECEIVE_FRIEND_NETWORK_STATUS },
              data
            )
          )
          socket.deauthenticate()
          //socket.kickOut([channel, message, callback])
        },
        error => {
          //console.log(TYPES.LOGOUT_FAILURE, error);
          res(TYPES.LOGOUT_FAILURE, error)
          socket.deauthenticate()
        }
      )
      
    })
    
    socket.on('disconnect', () => {
      if(socket.authToken) {
        database.logoutUser(socket.authToken, data => {
          //console.log(TYPES.LOGOUT_SUCCESS, data);
          scServer.exchange.publish(
            'service',
            Object.assign(
              { type: TYPES.RECEIVE_FRIEND_NETWORK_STATUS },
              data
            )
          )
        },
        error => {
          //console.log(TYPES.LOGOUT_FAILURE, error);
          console.error(TYPES.LOGOUT_FAILURE, error)
        })
      }
    })
    
  })
}