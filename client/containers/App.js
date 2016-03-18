import { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import Disconnected from '../components/Disconnected'
import Game from '../components/Game'
import Lobby from '../components/Lobby'
import Login from '../components/Login'
import UnsupportedBrowser from '../components/UnsupportedBrowser'

const initialTitle   = 'Connecting to server…'
const connectedTitle = 'Socket connected!'

class App extends Component {
  
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
    } = this.props

    return <DocumentTitle title={connected ? connectedTitle : initialTitle}>
      <div className="page">
        {loggedIn && <Lobby friends={friends} username={username} />}
        {game && <Game loggedIn={loggedIn} username={username} />}
        {!loggedIn && <Login />}
        {disconnected && <Disconnected username={username} connected={connected} />}
        {!supportedBrowser && <UnsupportedBrowser capabilities={capabilities} />}
      </div>
    </DocumentTitle>
  }
}

const mapFriendsStateToProps = ({
  friends,
  requests,
  invites,
}) => {
  return friends.map(friend => {
    return {...friend, invited: requests.has(friend.username), pending: invites.has(friend.username), online: friend.online * 1}
  })
}

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