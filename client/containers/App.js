import { Component, PropTypes } from 'react'
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
  static propTypes = {
    connected: PropTypes.bool,
    disconnected: PropTypes.bool,
    friends: PropTypes.array,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    game: PropTypes.object,
    supportedBrowser: PropTypes.bool,
    capabilities: PropTypes.object,
  }
  
  render() {
    const {
      connected,
      disconnected,
      friends,
      username,
      isAuthenticated,
      game,
      supportedBrowser,
      capabilities,
    } = this.props

    return <DocumentTitle title={connected ? connectedTitle : initialTitle}>
      <div className="page">
        {isAuthenticated && <Lobby friends={friends} username={username} />}
        {game && <Game isAuthenticated={isAuthenticated} username={username} />}
        {!isAuthenticated && <Login />}
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
      isAuthenticated: state.viewer.isAuthenticated,
      supportedBrowser: state.capabilities.websocket,
      capabilities: state.capabilities,
    }
  },
  null,
)(App)