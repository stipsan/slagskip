import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inviteFriend, acceptInvite, declineInvite } from '../../actions'

class FriendRow extends Component {
  handleInvite = event => {
    event.preventDefault();

    this.props.dispatch(inviteFriend(this.props.username));
  };
  handleAccept = event => {
    event.preventDefault();
    
    this.props.dispatch(acceptInvite(this.props.username));
  };
  handleDecline = event => {
    event.preventDefault();
    
    this.props.dispatch(declineInvite(this.props.username));
  };
  render() {
    const { username, pending, invited } = this.props;
    const { handleInvite, handleAccept, handleDecline } = this;
 
    return <li>
      {username}
      {invited && pending && <button>Start Game!</button>}
      {!invited && pending && <div>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>}
      {invited && !pending && <button disabled={true}>Pending</button>}
      {!invited && !pending && <button onClick={handleInvite}>Invite</button>}
    </li>;
  }
}

export default connect()(FriendRow);