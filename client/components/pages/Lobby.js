import { PropTypes } from 'react';

function Lobby({ friends, username, invites, requests }) {
  return <section className="section section--lobby">
    <header><h2>Welcome, {username}! <button>Logout</button></h2></header>
    <div className="users">
      {!!friends.length && <h3>Online users: </h3>}
      <ul>
        {!friends.length && <li>Nobody here yet but you!</li>}
        {friends.map(user => <li key={user.username}>
          {user.username} {invites.includes(user.username) && <button>Pending</button>}<button>Invite</button>
        </li>)}
      </ul>
    </div>
  </section>;
};

export default Lobby;