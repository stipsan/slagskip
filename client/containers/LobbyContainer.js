import { connect } from 'react-redux'
import Lobby from '../components/Lobby'

const mapStateToProps = state => {
  return {
    friends: state.friends,
    username: state.viewer.username
  };
};

export default connect(
  state => {
    return {
      friends: state.friends,
      username: state.viewer.username,
      disconnected: !state.serverConnection,
    }
  },
  null,
)(Lobby)