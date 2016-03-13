module.exports = function(scServer){
  
  const database = require('../database');
  const TYPES = require('../../shared/constants/ActionTypes');
  
  //@TODO implement a persistent datastore, likely redis, for users and use dataloader
  const invites = new Map(), requests = new Map(), idToUsername = {};

  scServer.on('connection', function(socket){

    console.log('a user connected');

    socket.on(TYPES.LOGIN_REQUEST, function (data, res) {
      
      console.log(TYPES.LOGIN_REQUEST, data);
      
      // @TODO reuse http status code as error code for failed validation?
      if(data.username.length < 3) return res('USERNAME_TOO_SHORT', {message: 'Username too short'});
      
      database.loginUser(
        {username: data.username, socket: socket.id},
        user => {
          idToUsername[socket.id] = data.username;
          
          console.log(TYPES.LOGIN_SUCCESS, user);
          res(null, user);
          //socket.broadcast.emit('join', data);
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

    socket.on('invite', function(friend) {
      console.log('invite', friend);
      //@TODO handle if username isn't found, may be disconnected or whatever
      const username = idToUsername[socket.id];
      database.userInviteFriend({
        user: {username},
        friend: {username: friend}
      }, () => {
        io.sockets.connected[recipient.id].emit('invited', username);
      }, () => {});
    });
    
  });
};