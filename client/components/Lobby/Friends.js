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
      {!friends.length && <h3>Nobody here yet but you!</h3>}
      <table className="users">
        <thead>
          <tr>
            <th colSpan={2}>{friends.length} Online friends</th>
          </tr>
        </thead>
        <tbody>
          {friends.map(user => <FriendRow
            key={user.username}
            username={user.username}
            invited={user.invited}
            pending={user.pending}
          />)}
        </tbody>
      </table>
    </section>;
  };
}

export default Friends;