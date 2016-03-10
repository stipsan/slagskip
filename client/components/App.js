import io from 'socket.io-client';
import { Component, PropTypes } from 'react';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Login from './pages/Login';

export default class App extends Component {
  
  state = {
    username: '',
    loggedIn: false,
    game: false,
    friends: [],
  };
  
  handleLogin = username => {
    console.log('sending socket', 'join', { username }, this.socket);
    this.socket.emit('login', { username });
  };
  
  componentWillMount() {
    this.socket = io();

    console.log('componentWillMount');
    this.socket.on('connect', data => {
      console.log('connect', data);
    });
    this.socket.on('successful login', data => {
      const { viewer: { username }, friends } = data;
      console.log('successful login', data);
      this.setState({ friends, loggedIn: true, username });
    });
    this.socket.on('failed login', data => window.alert(data.message));
    this.socket.on('join', user => {
      this.setState({ friends: [...this.state.friends, user] });
    });
    this.socket.on('logout', username => {
      const friends = this.state.friends.filter(user => user.username !== username);
      this.setState({ friends });
    });
    this.socket.on('disconnect', data => console.log('disconnect', data));
    this.socket.on('reconnect', data => console.log('reconnect', data));
  }
  
  render() {
    const { username, loggedIn, game, friends } = this.state;

    return <div>
        <Lobby friends={friends} username={username} />
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login handleSubmit={this.handleLogin} />}
    </div>;
  }
};