import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import className from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
} from '../../actions'

class FriendRow extends Component {
  state = {
    pendingForAWhile: true
  };
  
  componentWillReceiveProps(nextProps) {
    console.info('componentWillReceiveProps', nextProps);
    if(nextProps.invited && !this.props.invited) {
      this.setState({pendingForAWhile: false});
      setTimeout(
        () => this.setState({pendingForAWhile: true}),
        3000
      )
    }
  }
  
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
    const { username, pending, invited, online, lastVisit } = this.props;
    const { handleInvite, handleAccept, handleDecline, handleCancel, handleSubmit } = this;
    const {pendingForAWhile} = this.state;
 
    const canLaunchGame = invited && pending
    const canAcceptInvite = !invited && pending
    const canCancelInvite = invited && !pending
    const canInviteFriend = !invited && !pending
 
    return <tr className={className({ online })}>
      <td className="user-name">{username}</td>
      {
        online && 
        <td className="online-status">&bull;</td> ||
        <td className="last-visit">{lastVisit}</td>
      }
      <td className="control-group">
      <div>
        <button className={className('btn', {
          'btn-primary': canLaunchGame,
          'btn-accept': canAcceptInvite,
          'btn-pending': canCancelInvite,
          'btn-invite': canInviteFriend,
        })} onClick={handleInvite}>
          <ReactCSSTransitionGroup transitionName="button-label" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
            {canLaunchGame && <span>Start Game!</span>}
            {canAcceptInvite && <span>Accept</span>}
            {canCancelInvite && <span className={className(
              'progress-letters', {fresh: !pendingForAWhile}
            )}>
              {'Pending'.split('').map((letter, index) => <span key={index}>{letter}</span>)}
            </span>}
            {canInviteFriend && <span>Invite</span>}
          </ReactCSSTransitionGroup>
        </button>
        <button onClick={handleCancel} className={className(
          'btn btn-decline', {'btn-disabled': canLaunchGame || canInviteFriend}
        )}><strong>&times;</strong></button>
        </div>
      </td>
    </tr>;
  }
}

export default connect()(FriendRow);