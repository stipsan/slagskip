
// the 'socketcluster-client' package throws an exception if WebSocket does not exist
const socketCluster = global.WebSocket ? require('socketcluster-client') : false

export const socket = socketCluster && socketCluster.connect({
  hostname: process.env.SOCKET_HOSTNAME || location.hostname,
  autoReconnect: true,
  autoReconnectOptions: process.env.AUTO_RECONNECT_OPTIONS,
})
