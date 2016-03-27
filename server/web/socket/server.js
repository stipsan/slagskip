import { createDispatcher } from './dispatcher'
import * as database from '../../database'

export const createSocketServer = (scServer, redis) => {
  
  scServer.on('connection', function(socket){
    // @TODO handle .off to cleanup disconnected clients
    const dispatchEventHandler = createDispatcher(socket, database, redis)
    
    
    //console.log(process.pid, 'a user connected', authToken);
    /*
    socket.on(TYPES.LOAD_GAME_REQUEST, function(data, res) {
      console.log('load game debug', data)
      if(data.id !== '1') return res(TYPES.LOAD_GAME_FAILURE, 'game not found')
      
      
    })
    */
    /*
    socket.on(TYPES.AUTHENTICATE_REQUEST, function(data) {
      
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

    /*
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
      const username = socket.authToken.username
      database.userCancelInvite({
        user: {username},
        friend,
      }, id => {
        scServer.exchange.publish(`user:${friend.id}`, {
          type: TYPES.RECEIVE_GAME_INVITE_CANCELLED,
          username,
        })
        res(null, friend)
        
      }, err => {
        res(TYPES.CANCEL_GAME_INVITE_FAILURE, err)
      })
    })
    socket.on(TYPES.DECLINE_GAME_INVITE_REQUEST, function(friend, res) {
      const username = socket.authToken.username
      database.userDeclineInvite({
        user: {username},
        friend,
      }, id => {
        scServer.exchange.publish(`user:${friend.id}`, {
          type: TYPES.RECEIVE_GAME_INVITE_DECLINED,
          username,
        })
        res(null, friend)
        
      }, err => {
        res(TYPES.DECLINE_GAME_INVITE_FAILURE, err)
      })
    })
    socket.on(TYPES.ACCEPT_GAME_INVITE_REQUEST, function(friend, res) {
      const username = socket.authToken.username
      database.userAcceptInvite({
        user: {username},
        friend,
      }, id => {
        scServer.exchange.publish(`user:${friend.id}`, {
          type: TYPES.RECEIVE_GAME_INVITE_ACCEPTED,
          username,
        })
        res(null, friend)
        
      }, err => {
        res(TYPES.ACCEPT_GAME_INVITE_FAILURE, err)
      })
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
    //*/
    
    socket.on('disconnect', () => {
      if(socket.authToken) {
        /*scServer.exchange.publish('service', {
          type: TYPES.RECEIVE_FRIEND_NETWORK_STATUS,
          id: socket.authToken.id,
          username: socket.authToken.username
        })*/
      }
    })
    
  })
}