import { PropTypes } from 'react'
import Disconnected from './Disconnected'
import Game from '../Game'
import Friends from './Friends'
import Login from './Login'

export default function Lobby({
  username,
  loggedIn,
  game,
  friends,
  disconnected,
  invites,
  requests,
  handleInvite,
  handleAccept,
  handleDecline,
  handleLogout,
  handleLogin,
}) {
  return <div>
    <Friends
      friends={friends}
      username={username}
      invites={invites}
      requests={requests}
      handleInvite={handleInvite}
      handleAccept={handleAccept}
      handleDecline={handleDecline}
      handleLogout={handleLogout}
    />
    {game && <Game loggedIn={loggedIn} username={username} />}
    {!loggedIn && <Login handleSubmit={handleLogin} />}
    {disconnected && <Disconnected username={username} />}
  </div>
}