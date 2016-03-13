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
 
    return <tr>
      <td className="user-name">{username}</td>
      <td>
      {invited && pending && <button className="btn btn-primary">Start Game!</button>}
      {!invited && pending && <div>
        <button className="btn btn-accept" onClick={handleAccept}>Accept</button>
        <button className="btn btn-decline" onClick={handleDecline}>&times;</button>
      </div>}
      {invited && !pending && <button className="btn btn-default" disabled={true}>Pending</button>}
      {!invited && !pending && <button className="btn btn-default" onClick={handleInvite}>Invite</button>}
      </td>
    </tr>;
  }
}

export default connect()(FriendRow);