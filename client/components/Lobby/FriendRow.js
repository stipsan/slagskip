import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inviteFriend, acceptInvite, declineInvite } from '../../actions'

class FriendRow extends Component {
  handleInvite = event => {
    event.preventDefault();
    
    //@TODO PropTypes validation on user.username
    this.props.handleInvite(this.props.user.username);
    
  };
  handleAccept = event => {
    event.preventDefault();
    
    //@TODO PropTypes validation on user.username
    this.props.handleAccept(this.props.user.username);
  };
  handleDecline = event => {
    event.preventDefault();
    
    //@TODO PropTypes validation on user.username
    this.props.handleDecline(this.props.user.username);
  };
  render() {
    const { user } = this.props;
    const { handleInvite, handleAccept, handleDecline } = this;
 
    return <li key={user.username}>
      {user.username}
      {user.invited && user.pending && <button>Start Game!</button>}
      {!user.invited && user.pending && <div>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>}
      {user.invited && !user.pending && <button disabled={true}>Pending</button>}
      {!user.invited && !user.pending && <button onClick={handleInvite}>Invite</button>}
    </li>;
  }
}

export default connect()(FriendRow);