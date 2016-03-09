import { PropTypes } from 'react';

function Lobby({ users, username }) {
  return <section className="section section--lobby">
    <h2>Welcome, {username}!</h2>
    <ul>
      {users.filter(user => user.username !== username).map(user => <li key={user.username}>{user.username}</li>)}
    </ul>
  </section>;
};

export default Lobby;