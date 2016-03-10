import { PropTypes } from 'react';

function Disconnected({ username }) {
  return <section className="section section--disconnected">
      <h2>You got disconnected!</h2>
      {!!username && <p>You'll be logged back in as soon as the server is reached again.</p>}
      {!username && <p>Attempting to reconnect.</p>}
      <p>You don't need to refresh the page.</p>
  </section>;
};

export default Disconnected;