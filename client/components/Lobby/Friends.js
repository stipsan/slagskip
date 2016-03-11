import { Component, PropTypes } from 'react'
import FriendRow from './FriendRow'

class Friends extends Component {
  render() {
    const {
      friends,
      username,
      invites,
      requests,
      handleLogout,
    } = this.props;

    return <section className="section section--lobby">
      <header><h2>Welcome, {username}! <button onClick={handleLogout}>Logout</button></h2></header>
      <div className="users">
        {!!friends.length && <h3>Online friends: </h3>}
        <ul>
          {!friends.length && <li>Nobody here yet but you!</li>}
          {friends.map(user => <FriendRow
            key={user.username}
            user={user}
          />)}
        </ul>
      </div>
    </section>;
  };
}

export default Friends;