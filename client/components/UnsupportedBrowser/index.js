import { PropTypes } from 'react';

function UnsupportedBrowser({ capabilities }) {
  return <section className="section section--unsupported-browser">
      <h2>You got disconnected!</h2>
      {!connected && <h2>Socket failed to connect!</h2>}
      {!!username && <p>You'll be logged back in as soon as the server is reached again.</p>}
      {connected && !username && <p>Attempting to reconnect.</p>}
      {connected && <p>You don't need to refresh the page.</p>}
      {!connected && <p>Try reloading the page.</p>}
  </section>;
};

export default UnsupportedBrowser;