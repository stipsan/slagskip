import socketCluster from 'socketcluster-client'

let socket;

export function connect(success, failure) {
  socket = socketCluster.connect(function(...args){
    console.log('socketCluster.connect', args);
  });
  
  socket.on('connect', success);
  socket.on('error', failure);
};

export function loginRequest(username, success, failure) {
  socket.emit('login', {username});
  socket.on('successful login', success);
  socket.on('failed login', failure);
};