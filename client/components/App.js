import io from 'socket.io-client';
import { Component, PropTypes } from 'react';
import Disconnected from './pages/Disconnected';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Login from './pages/Login';

export default class App extends Component {
  
  state = {
    username: '',
    loggedIn: false,
    disconnected: false,
    game: false,
    friends: [],
  };
  
  handleLogin = username => {
    console.log('sending socket', 'join', { username }, this.socket);
    this.socket.emit('login', { username });
    //@TODO create a real solution for persistence
    localStorage.setItem('username', username);
  };
  
  componentWillMount() {
    this.socket = io();

    console.log('componentWillMount');
    this.socket.on('connect', data => {
      console.log('connect', data);
      
      let username;
      if(username = localStorage.getItem('username')) {
        this.socket.emit('login', { username });
      }
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
    this.socket.on('disconnect', data => {
      console.log('disconnect', data);
      // @TODO have a offline/disconnected state
      this.setState({disconnected: true});
    });
    this.socket.on('reconnect', data => {
      this.setState({disconnected: false});
      this.socket.emit('login', { username: this.state.username });
      console.log('reconnect', data);
    });
  }
  
  render() {
    const { username, loggedIn, game, friends, disconnected } = this.state;

    return <div>
        <Lobby friends={friends} username={username} />
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login handleSubmit={this.handleLogin} />}
        {disconnected && <Disconnected username={username} />}
    </div>;
  }
};