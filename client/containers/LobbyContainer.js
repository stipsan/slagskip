import { connect } from 'react-redux'
import Lobby from '../components/Lobby'

const mapFriendsStateToProps = ({
  friends,
  requests,
  invites,
}) => {
  return friends.map(friend => {
    return {...friend, invited: requests.includes(friend.username), pending: invites.includes(friend.username)};
  });
};

export default connect(
  state => {
    return {
      friends: mapFriendsStateToProps(state),
      username: state.viewer.username,
      disconnected: !state.serverConnection,
      loggedIn: state.viewer.loggedIn
    }
  },
  null,
)(Lobby)