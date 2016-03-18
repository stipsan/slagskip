import { PropTypes } from 'react'

function Disconnected({ username, connected }) {
  return <section className="section section--disconnected">
      {connected && <h2>You got disconnected!</h2>}
      {!connected && <h2>Socket failed to connect!</h2>}
      {!!username && <p>You'll be logged back in as soon as the server is reached again.</p>}
      {connected && !username && <p>Attempting to reconnect.</p>}
      {connected && <p>You don't need to refresh the page.</p>}
      {!connected && <p>Try reloading the page.</p>}
  </section>
}
Disconnected.propTypes = {
  username: PropTypes.string,
  connected: PropTypes.bool.isRequired,
}

export default Disconnected