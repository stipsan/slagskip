module.exports = function(worker){
  
  const scServer = worker.scServer;
  const wsServer = worker.getSCServer();
  
  wsServer.addMiddleware(wsServer.MIDDLEWARE_SUBSCRIBE,
  function (req, next) {
    var authToken = req.socket.getAuthToken();
    console.log('middleware.authToken', authToken);
    if (req.authTokenExpiredError) {
      next(req.authTokenExpiredError); // Fail with a default auth token expiry error
    } else if (authToken && authToken.channels.indexOf(req.channel) > -1) {
      next() // Allow
    } else {
      next(true); // Block
      // next(true); // Passing true to next() blocks quietly (without raising a warning on the server-side)
    }
  }
);
  
  const database = require('../database');
  const TYPES = require('../../shared/constants/ActionTypes');
  
  //@TODO implement a persistent datastore, likely redis, for users and use dataloader
  const invites = new Map(), requests = new Map(), idToUsername = {};

  scServer.on('connection', function(socket){

    console.log(process.pid, 'a user connected', socket.getAuthToken());

    socket.on(TYPES.LOGIN_REQUEST, function (data, res) {
      console.log(TYPES.LOGIN_REQUEST, data);
      
      // @TODO reuse http status code as error code for failed validation?
      if(data.username.length < 3) return res('USERNAME_TOO_SHORT', {message: 'Username too short'});
      
      database.loginUser(
        {username: data.username, socket: socket.id},
        user => {          
          console.log(TYPES.LOGIN_SUCCESS, user);
          res(null, user);
          socket.setAuthToken({username: data.username, channels: ['service', `user:${user.id}`]});
          //socket.broadcast.emit('join', data);
          scServer.exchange.publish('service', {
            type: TYPES.RECEIVE_FRIEND,
            username: {data.username}
          })
        },
        error => {
          console.log(TYPES.LOGIN_FAILURE, error);
          res(TYPES.LOGIN_FAILURE, error)
        }
      );
    });
    
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
      console.log('invite', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username;
      database.userInviteFriend({
        user: {username},
        friend
      }, id => {
        console.log('userInviteFriend', friend, `user:${id}`);
        scServer.exchange.publish(`user:${id}`, {
          type: TYPES.RECEIVE_GAME_INVITE,
          username: socket.authToken.username,
        });
        res(null, friend);
        
      }, err => {
        res(TYPES.GAME_INVITE_FAILURE, err);
      });
    });
    
    socket.on(TYPES.CANCEL_GAME_INVITE_REQUEST, function(friend, res) {
      console.log('decline', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username;
      scServer.exchange.publish(`user:${friend.id}`, {
        type: TYPES.RECEIVE_GAME_INVITE_CANCELLED,
        username: socket.authToken.username,
      });
      res(null, friend);
    });
    socket.on(TYPES.DECLINE_GAME_INVITE_REQUEST, function(friend, res) {
      console.log('decline', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username;
      scServer.exchange.publish(`user:${friend.id}`, {
        type: TYPES.RECEIVE_GAME_INVITE_DECLINED,
        username: socket.authToken.username,
      });
      res(null, friend);
    });
    socket.on(TYPES.ACCEPT_GAME_INVITE_REQUEST, function(friend, res) {
      console.log('accept', friend);
      // @TODO guard emits in middleware to ensure only authenticated requests come through
      const username = socket.authToken.username;
      scServer.exchange.publish(`user:${friend.id}`, {
        type: TYPES.RECEIVE_GAME_INVITE_ACCEPTED,
        username: socket.authToken.username,
      });
      res(null, friend);
    });
    
  });
};