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
    users: [],
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
      const { viewer: { username }, users } = data;
      console.log('lobby', users);
      this.setState({ users, loggedIn: true, username });
    });
    this.socket.on('failed login', data => window.alert(data.message));
    this.socket.on('join', user => {
      this.setState({ users: [...this.state.users, user] });
    });
  }
  
  render() {
    const { username, loggedIn, game, users } = this.state;

    return <div>
        <Lobby users={users} username={username} />
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login handleSubmit={this.handleLogin} />}
    </div>;
  }
};