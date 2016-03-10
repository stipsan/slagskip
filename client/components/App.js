import io from 'socket.io-client';
import { Component, PropTypes } from 'react';
import Disconnected from './pages/Disconnected';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Login from './pages/Login';
import {requestNotificationPermission, sendNotification} from '../utils/notify';

export default class App extends Component {
  
  state = {
    username: '',
    loggedIn: false,
    disconnected: false,
    game: false,
    invites: [],
    requests: [],
    friends: [],
  };
  
  handleLogin = username => {
    console.log('sending socket', 'join', { username }, this.socket);
    this.socket.emit('login', { username, userAgent: navigator.appVersion });
    //@TODO create a real solution for persistence
    localStorage.setItem('username', username);
  };
  handleInvite = username => {
    console.log('handleInvite', username);
    this.setState({ requests: [...this.state.requests, username] });

    this.socket.emit('invite', username);
  };
  handleAccept = username => {
    console.log('handleAccept', username);
    this.setState({ requests: [...this.state.requests, this.state.username] });

    this.socket.emit('accept', username);
  };
  handleDeny = username => {
    console.log('handleDeny', username);
    this.setState({ invitations: this.state.invitations.filter(invite !== username) });

    this.socket.emit('deny', username);
  };
  
  componentWillMount() {
    // now is a good time to ask for notification permissions
    requestNotificationPermission();

    this.socket = io();

    this.socket.on('connect', data => {
      console.log('connect', data);
      
      let username = localStorage.getItem('username');
      if(username && username.length > 2) {
        this.socket.emit('login', { username, userAgent: navigator.appVersion });
      }
    });

    this.socket.on('successful login', data => {
      const { viewer: { username }, friends } = data;
      console.log('successful login', data);
      this.setState({ friends, loggedIn: true, username });
    });

    this.socket.on('failed login', data => sendNotification(data.message));

    // someone logged in
    this.socket.on('join', user => {
      this.setState({ friends: [...this.state.friends, user] });
    });

    this.socket.on('invited', data => console.log('invited', data));
    this.socket.on('accepted', data => console.log('accepted', data));
    this.socket.on('declined', data => console.log('declined', data));

    this.socket.on('logout', username => {
      const friends = this.state.friends.filter(user => user.username !== username);
      this.setState({ friends });
    });
    this.socket.on('disconnect', data => {
      console.log('disconnect', data);
      // @TODO have a offline/disconnected state
      this.setState({disconnected: true});
    });
    this.socket.on('reconnect', data => {
      this.setState({disconnected: false});
      console.log('reconnect', data);
    });
  }
  
  render() {
    const { username, loggedIn, game, friends, disconnected, invites, requests } = this.state;

    return <div>
        <Lobby friends={friends} username={username} invites={invites} requests={requests} />
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login handleSubmit={this.handleLogin} />}
        {disconnected && <Disconnected username={username} />}
    </div>;
  }
};