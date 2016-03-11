module.exports = function(io){
  
  //@TODO implement a persistent datastore, likely redis, for users and use dataloader
  const users = new Map(), invites = new Map(), requests = new Map(), idToUsername = {};

  io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('login', function(data) {
      
      console.log('join', data);
      if(data.username.length < 3) return socket.emit('failed login', {message: 'Username too short'});

      if(!invites.has(data.username)) {
        invites.set(data.username, new Set);
      }
      if(!requests.has(data.username)) {
        requests.set(data.username, new Set);
      }

      //@TODO deal with persistence, log out previous socket on same user if it exists
      if(!users.has(data.username) || true) {

        users.set(data.username, {username: data.username, id: socket.id});
        idToUsername[socket.id] = data.username;
        
        const friends = Array.from(users.values()).filter(user => user.username !== data.username);
        socket.emit('successful login', {
          friends: friends,
          viewer: {
            username: data.username,
            //@TODO rename to inbox/outbox?
            invites: Array.from(invites.get(data.username)),
            requests: Array.from(requests.get(data.username)),
          }
        });
        socket.broadcast.emit('join', data);
      } else {
        socket.emit('failed login', {message: `Username ${data.username} is already logged in!`});
      }
    });

    socket.on('invite', function(friend) {
      console.log('invite', friend);
      //@TODO handle if username isn't found, may be disconnected or whatever
      const recipient = users.get(friend);
      const username = idToUsername[socket.id];

      invites.get(recipient.username).add(username);
      requests.get(username).add(recipient.username);

      io.sockets.connected[recipient.id].emit('invited', username);
    });
    //@TODO add cancelling an sent invite
    socket.on('accept', function(friend) {
      console.log('accept', friend);
      //@TODO handle if username isn't found, may be disconnected or whatever
      const host = users.get(friend);
      const username = idToUsername[socket.id];
      
      invites.get(host.username).add(username);
      requests.get(username).add(host.username);

      io.sockets.connected[host.id].emit('accepted', username);
    });
    socket.on('decline', function(friend) {
      console.log('decline', friend);
      //@TODO handle if username isn't found, may be disconnected or whatever
      const host = users.get(friend);
      const username = idToUsername[socket.id];
      
      invites.get(username).delete(host.username);
      requests.get(host.username).delete(username);

      io.sockets.connected[host.id].emit('declined', username);
    });

    //@TODO
    //socket.on('logout', logout);
    //socket.on('disconnect', logout);
    function logout(){
      const username = idToUsername[socket.id];
      console.log(`user ${username} logout`);
      users.delete(username);
      io.emit('logout', username);
      delete idToUsername[socket.id];
    };
  });
};