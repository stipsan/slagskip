module.exports = function(io){
  const users = new Map(), idToUsername = {};
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.broadcast.emit('user connected');
    socket.on('login', function (data) {
      console.log('join', data);
      if(data.username.length < 3) return socket.emit('failed login', {message: 'Username too short'});
      if(!users.has(data.username)) {
        
        users.set(data.username, {username: data.username, id: socket.id});
        idToUsername[socket.id] = data.username;
        
        const friends = Array.from(users.values()).filter(user => user.username !== data.username);
        socket.emit('successful login', {
          friends: friends,
          viewer: {
            username: data.username,
            invites: [],
            requests: [],
          }
        });
        socket.broadcast.emit('join', data);
      } else {
        socket.emit('failed login', {message: 'Username is taken!'});
      }
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
      const username = idToUsername[socket.id];
      users.delete(username);
      io.emit('logout', username);
      delete idToUsername[socket.id];
    });
  });
};