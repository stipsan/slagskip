import {Component, PropTypes} from 'react';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Login from './pages/Login';

export default class App extends Component {
  
  state = {};
  
  render() {
    return <div>
        <Lobby />
        <Game />
        <Login />
    </div>;
  }
};