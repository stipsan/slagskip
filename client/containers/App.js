import { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import {requestNotificationPermission, sendNotification} from '../utils/notify';

import { LOGIN_SUCCESS, RECEIVE_GAME_INVITE, GAME_INVITE_SUCCESS } from '../constants/ActionTypes';
import { connectSocket } from '../actions';

import Disconnected from '../components/Disconnected'
import Game from '../components/Game'
import Lobby from '../components/Lobby'
import Login from '../components/Login'
import UnsupportedBrowser from '../components/UnsupportedBrowser'

const initialTitle   = 'Connecting to server…'
const connectedTitle = 'Socket connected!'

class App extends Component {

  componentWillMount() {
    this.props.dispatch(connectSocket());
  }
  
  render() {
    const {
      connected,
      disconnected,
      friends,
      username,
      loggedIn,
      game,
      supportedBrowser,
      capabilities,
    } = this.props;
    console.error(supportedBrowser);
    return <DocumentTitle title={connected ? connectedTitle : initialTitle}>
      <div className="page">
        <Lobby friends={friends} username={username} />
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login />}
        {disconnected && <Disconnected username={username} connected={connected} />}
        {!supportedBrowser && <UnsupportedBrowser capabilities={capabilities} />}
      </div>
    </DocumentTitle>;
  }
};

const mapFriendsStateToProps = ({
  friends,
  requests,
  invites,
}) => {
  return friends.map(friend => {
    return {...friend, invited: requests.has(friend.username), pending: invites.has(friend.username)};
  });
};

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  state => {
    return {
      friends: mapFriendsStateToProps(state),
      username: state.viewer.username,
      connected: state.connected,
      disconnected: state.disconnected,
      loggedIn: state.viewer.loggedIn,
      supportedBrowser: state.capabilities.websocket,
      capabilities: state.capabilities,
    }
  },
  null,
)(App)