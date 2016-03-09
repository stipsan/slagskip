import { Component, PropTypes } from 'react';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Login from './pages/Login';

export default class App extends Component {
  
  state = {
    username: '',
    loggedIn: false,
    game: false,
  };
  
  handleLogin = username => {
    this.setState({ loggedIn: true, username });
  };
  
  render() {
    const { username, loggedIn, game } = this.state;

    return <div>
        <Lobby />
        {game && <Game />}
        {!loggedIn && <Login handleSubmit={this.handleLogin} />}
    </div>;
  }
};