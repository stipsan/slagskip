import socketCluster from 'socketcluster-client'

let socket;

export function connect(success, failure) {
  socket = socketCluster.connect();
  
  socket.on('connect', success);
  socket.on('error', failure);
};