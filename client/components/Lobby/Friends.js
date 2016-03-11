import { Component, PropTypes } from 'react';

class User extends Component {
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

const Friends = ({
  friends,
  username,
  invites,
  requests,
  handleInvite,
  handleAccept,
  handleDecline,
  handleLogout,
}) => {

  return <section className="section section--lobby">
    <header><h2>Welcome, {username}! <button onClick={handleLogout}>Logout</button></h2></header>
    <div className="users">
      {!!friends.length && <h3>Online friends: </h3>}
      <ul>
        {!friends.length && <li>Nobody here yet but you!</li>}
        {friends.map(user => <User
          key={user.username}
          user={user}
          handleInvite={handleInvite}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />)}
      </ul>
    </div>
  </section>;
};

export default Friends;