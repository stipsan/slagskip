import io from 'socket.io-client';
import { Component, PropTypes } from 'react';

import {requestNotificationPermission, sendNotification} from '../utils/notify';

import LobbyContainer from './LobbyContainer';
import Lobby from '../components/Lobby';

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
  handleLogout = event => {
    localStorage.removeItem('username');
    this.setState({loggedIn: false, username: false});
    this.socket.emit('logout');
  }
  handleInvite = username => {
    console.log('handleInvite', username);
    this.setState({ requests: [...this.state.requests, username] });

    this.socket.emit('invite', username);
  };
  handleAccept = username => {
    console.log('handleAccept', username);
    this.setState({ requests: [...this.state.requests, username] });

    this.socket.emit('accept', username);
  };
  handleDecline = username => {
    console.log('handleDecline', username);
    this.setState({ invites: this.state.invites.filter(invite => invite !== username) });

    this.socket.emit('decline', username);
  };
  
  componentWillMount() {
    // now is a good time to ask for notification permissions
    requestNotificationPermission();

    this.socket = io();

    this.socket.on('connect', data => {
      console.log('connect', data);
      
      let username = this.state.username || localStorage.getItem('username');
      if(username && username.length > 2) {
        this.socket.emit('login', { username, userAgent: navigator.appVersion });
      }
    });

    this.socket.on('successful login', data => {
      const { viewer, friends } = data;
      console.log('successful login', data);
      this.setState({ friends, loggedIn: true, ...viewer });
    });

    this.socket.on('failed login', data => sendNotification(data.message));

    // someone logged in
    this.socket.on('join', user => {
      this.setState({ friends: [...this.state.friends, user] });
    });

    this.socket.on('invited', host => this.setState({ invites: [...this.state.invites, host] }));
    this.socket.on('accepted', friend => this.setState({ invites: [...this.state.invites, friend] }));
    this.socket.on('declined', friend => this.setState({ requests: this.state.requests.filter(request => request !== friend) }));

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
    const {
      username,
      loggedIn,
      game,
      friends,
      disconnected,
      invites,
      requests,
    } = this.state;
    const { handleInvite, handleAccept, handleDecline, handleLogout, handleLogin } = this;

    return <div>
        <Lobby
          username={username}
          loggedIn={loggedIn}
          game={game}
          friends={friends}
          disconnected={disconnected}
          invites={invites}
          requests={requests}
          handleInvite={handleInvite}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
        <LobbyContainer />
    </div>;
  }
};