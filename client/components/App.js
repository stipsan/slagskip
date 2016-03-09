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
    this.setState({ loggedIn: true, username });
    console.log('sending socket', 'join', { username }, this.socket);
    this.socket.emit('login', { username });
  };
  
  componentWillMount() {
    this.socket = io();
    console.log('componentWillMount');
    this.socket.on('connect', data => {
      console.log('connect', data);
    });
    this.socket.on('lobby', users => {
      console.log('lobby', users);
      this.setState({ users });
    });
    this.socket.on('join', user => {
      console.log('join', user, [...this.state.users, user]);
      this.setState({ users: [...this.state.users, user] });
    });
  }
  
  render() {
    const { username, loggedIn, game, users } = this.state;

    return <div>
        <Lobby users={users} />
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login handleSubmit={this.handleLogin} />}
    </div>;
  }
};