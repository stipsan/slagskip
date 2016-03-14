import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import className from 'classnames'
import {} 'react-addons-css-transition-group'
import {
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
} from '../../actions'

class FriendRow extends Component {
  handleInvite = event => {
    event.preventDefault();
    
    const { id, username } = this.props;

    this.props.dispatch(gameInvite({ id, username }));
  };
  handleAccept = event => {
    event.preventDefault();
    
    const { id, username } = this.props;

    this.props.dispatch(acceptGameInvite({ id, username }));    
  };
  handleDecline = event => {
    event.preventDefault();
    
    const { id, username } = this.props;

    this.props.dispatch(declineGameInvite({ id, username }));    
  };
  handleCancel = event => {
    event.preventDefault();
    
    const { id, username } = this.props;

    this.props.dispatch(cancelGameInvite({ id, username }));    
  };
  render() {
    const { username, pending, invited } = this.props;
    const { handleInvite, handleAccept, handleDecline, handleCancel, handleSubmit } = this;
 
    const canLaunchGame = invited && pending
    const canAcceptInvite = !invited && pending
    const canCancelInvite = invited && !pending
    const canInviteFriend = !invited && !pending
 
    return <tr>
      <td className="user-name">{username}</td>
      <td className="control-group">
      <div>
        <button className={className('btn', {
          'btn-primary': canLaunchGame,
          'btn-accept': canAcceptInvite,
          'btn-pending': canCancelInvite,
          'btn-invite': canInviteFriend,
        })} onClick={handleInvite}>
          {canLaunchGame && 'Start Game!'}
          {canAcceptInvite && 'Accept'}
          {canCancelInvite && 'Pending'}
          {canInviteFriend && 'Invite'}
        </button>
        <button onClick={handleCancel} className={className(
          'btn btn-decline', {'btn-disabled': !invited && !pending}
        )}><strong>&times;</strong></button>
        </div>
      </td>
    </tr>;
  }
}

export default connect()(FriendRow);