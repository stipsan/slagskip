import { PropTypes } from 'react';

function Lobby({ friends, username }) {
  return <section className="section section--lobby">
    <h2>Welcome, {username}!</h2>
    {!!friends.length && <h3>Online users: </h3>}
    <ul>
      {!friends.length && <li>Nobody here yet but you!</li>}
      {friends.map(user => <li key={user.username}>{user.username}</li>)}
    </ul>
  </section>;
};

export default Lobby;