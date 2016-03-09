import { PropTypes } from 'react';

function Lobby({ users }) {
  return <section className="section section--lobby">
    The lobby
    <ul>
      {users.map(user => <li>{user.username}</li>)}
    </ul>
  </section>;
};

export default Lobby;