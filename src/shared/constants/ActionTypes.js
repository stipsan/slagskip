// async network requests is suffixed _REQUESTED, _SUCCESS or _FAILURE
// actions that respond to server sent events is prefixed RECEIVE_

export const CHECK_CAPABILITIES = 'CHECK_CAPABILITIES'

// client local network status (client to router)
// @TODO add network middleware that dispatch these
export const RECEIVE_NETWORK_OFFLINE = 'RECEIVE_NETWORK_OFFLINE'
export const RECEIVE_NETWORK_ONLINE = 'RECEIVE_NETWORK_ONLINE'

// attempting to connect SocketCluster to server
export const SOCKET_REQUESTED = 'SOCKET_REQUESTED'
// socket connected successfully
export const SOCKET_SUCCESS = 'SOCKET_SUCCESS'
// socket got disconnected, or maybe the user got bandwidth capped, a firewall
// blocks the websocket but is letting http requests come through, etc.
export const SOCKET_FAILURE = 'SOCKET_FAILURE'
export const SOCKET_ERROR = 'SOCKET_ERROR'
// allow manual trigger of reconnect w/o full page reload or waiting for timeout
export const SOCKET_RECONNECT = 'SOCKET_RECONNECT'
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT'
// signal the socket saga we want the socket to emit
export const SOCKET_EMIT = 'SOCKET_EMIT'
export const SOCKET_PING_TIMEOUT = 'SOCKET_PING_TIMEOUT'
export const SOCKET_PONG_TIMEOUT = 'SOCKET_PONG_TIMEOUT'
export const SOCKET_TASK_TIMEOUT = 'SOCKET_TASK_TIMEOUT'

// check if email exists
export const CHECK_EMAIL_EXISTS_REQUESTED = 'CHECK_EMAIL_EXISTS_REQUESTED'
export const CHECK_EMAIL_EXISTS_SUCCESS = 'CHECK_EMAIL_EXISTS_SUCCESS'
export const CHECK_EMAIL_EXISTS_FAILURE = 'CHECK_EMAIL_EXISTS_FAILURE'

// special redux-forms promise based async validation
export const CHECK_EMAIL_EXISTS_ASYNC = 'CHECK_EMAIL_EXISTS_ASYNC'

// attempt login
export const AUTHENTICATE_REQUESTED = 'AUTHENTICATE_REQUESTED'
// login succeeded, payload contains friends, invities and game matches
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE'
// we got a valid authentication and don't need to login
export const VIEWER_REQUESTED = 'VIEWER_REQUESTED'
export const VIEWER_SUCCESS = 'VIEWER_SUCCESS'
export const VIEWER_FAILURE = 'VIEWER_FAILURE'
export const RECEIVE_VIEWER = 'RECEIVE_VIEWER'
export const RECEIVE_AUTH_STATE_CHANGE = 'RECEIVE_AUTH_STATE_CHANGE'
export const RECEIVE_AUTHENTICATE = 'RECEIVE_AUTHENTICATE'
// attempt logout
export const DEAUTHENTICATE_REQUESTED = 'DEAUTHENTICATE_REQUESTED'
export const DEAUTHENTICATE_SUCCESS = 'DEAUTHENTICATE_SUCCESS'
export const DEAUTHENTICATE_FAILURE = 'DEAUTHENTICATE_FAILURE'
export const RECEIVE_DEAUTHENTICATE = 'RECEIVE_DEAUTHENTICATE'

// user signup
export const CREATE_USER_REQUESTED = 'CREATE_USER_REQUESTED'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

// setup private and public service channel subs
export const SUBSCRIBE_CHANNEL_REQUESTED = 'SUBSCRIBE_CHANNEL_REQUESTED'
export const SUBSCRIBE_CHANNEL_SUCCESS = 'SUBSCRIBE_CHANNEL_SUCCESS'
export const SUBSCRIBE_CHANNEL_FAILURE = 'SUBSCRIBE_CHANNEL_FAILURE'
export const RECEIVE_SUBSCRIBE_STATE_CHANGE = 'RECEIVE_SUBSCRIBE_STATE_CHANGE'
export const RECEIVE_UNSUBSCRIBE_CHANNEL = 'RECEIVE_UNSUBSCRIBE_CHANNEL'
export const RECEIVE_KICK_OUT = 'RECEIVE_KICK_OUT'

// during alpha everybody is friends, friends lists will come later
export const FRIENDS_REQUESTED = 'FRIENDS_REQUESTED'
export const FRIENDS_SUCCESS = 'FRIENDS_SUCCESS'
export const FRIENDS_FAILURE = 'FRIENDS_FAILURE'
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND'
// user came online or disconnected/signed out
export const RECEIVE_FRIEND_NETWORK_STATUS = 'RECEIVE_FRIEND_NETWORK_STATUS'
// friend got kicked or deleted their own account
export const RECEIVE_FRIEND_DELETED = 'RECEIVE_FRIEND_DELETED'

export const GAMES_REQUESTED = 'GAMES_REQUESTED'
export const GAMES_SUCCESS = 'GAMES_SUCCESS'
export const GAMES_FAILURE = 'GAMES_FAILURE'

// send the invite to a friend, show spinner
export const GAME_INVITE_REQUESTED = 'GAME_INVITE_REQUESTED'
// friend received invite, show pending response label
export const GAME_INVITE_SUCCESS = 'GAME_INVITE_SUCCESS'
// failed to send it, retry?
export const GAME_INVITE_FAILURE = 'GAME_INVITE_FAILURE'
// notify a friend wants to play, allow notification to respond,
// additionally show accept/decline buttons in lobby friends list
export const RECEIVE_GAME_INVITE = 'RECEIVE_GAME_INVITE'
export const DECLINE_GAME_INVITE_REQUESTED = 'DECLINE_GAME_INVITE_REQUESTED'
export const DECLINE_GAME_INVITE_SUCCESS = 'DECLINE_GAME_INVITE_SUCCESS'
export const DECLINE_GAME_INVITE_FAILURE = 'DECLINE_GAME_INVITE_FAILURE'
export const RECEIVE_GAME_INVITE_DECLINED = 'RECEIVE_GAME_INVITE_DECLINED'
export const ACCEPT_GAME_INVITE_REQUESTED = 'ACCEPT_GAME_INVITE_REQUESTED'
// two friends wants to play, show button for launching the match
export const ACCEPT_GAME_INVITE_SUCCESS = 'ACCEPT_GAME_INVITE_SUCCESS'
export const ACCEPT_GAME_INVITE_FAILURE = 'ACCEPT_GAME_INVITE_FAILURE'
// same as ACCEPT_GAME_INVITE_SUCCESS
export const RECEIVE_GAME_INVITE_ACCEPTED = 'RECEIVE_GAME_INVITE_ACCEPTED'
export const CANCEL_GAME_INVITE_REQUESTED = 'CANCEL_GAME_INVITE_REQUESTED'
export const CANCEL_GAME_INVITE_SUCCESS = 'CANCEL_GAME_INVITE_SUCCESS'
export const CANCEL_GAME_INVITE_FAILURE = 'CANCEL_GAME_INVITE_FAILURE'
export const RECEIVE_GAME_INVITE_CANCELLED = 'RECEIVE_GAME_INVITE_CANCELLED'
// transition to new view, show loading status,
// server sets up a new socket channel for the match and we join it
export const NEW_GAME_REQUESTED = 'NEW_GAME_REQUESTED'
// lovely, payload will tell us if we're waiting for our friend to join'
export const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS'
// failed, allow retrying
export const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE'
export const JOIN_GAME_REQUESTED = 'JOIN_GAME_REQUESTED'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const JOIN_GAME_FAILURE = 'JOIN_GAME_FAILURE'
export const RECEIVE_NEW_GAME = 'RECEIVE_NEW_GAME'
// our opponent joined the game
export const RECEIVE_JOIN_GAME = 'RECEIVE_JOIN_GAME'

// actions for setting up our own battleship formation
export const ADD_ITEM = 'ADD_ITEM'
export const MOVE_ITEM = 'MOVE_ITEM'
export const ROTATE_ITEM = 'ROTATE_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const RESET_ITEMS = 'RESET_ITEMS'
export const LOAD_ITEMS = 'LOAD_ITEMS'
export const RANDOM_ITEMS = 'RANDOM_ITEMS'

// attempting to start the game
export const LOAD_GAME_REQUESTED = 'LOAD_GAME_REQUESTED'
// payload contains who is to make the first move
export const LOAD_GAME_SUCCESS = 'LOAD_GAME_SUCCESS'
export const LOAD_GAME_FAILURE = 'LOAD_GAME_FAILURE'

// Game has begun, not our turn
export const RECEIVE_READY = 'RECEIVE_READY'
// Game has begun, we got first move
export const RECEIVE_WAITING = 'RECEIVE_WAITING'

// aim our cannons!
export const PLACE_CROSSHAIRS = 'PLACE_CROSSHAIRS'

// fire the cannon, perhaps show a cannon firing to entertain the user while waiting
export const FIRE_CANNON_REQUESTED = 'FIRE_CANNON_REQUESTED'
// payload tells us if it's hit or miss
export const FIRE_CANNON_SUCCESS = 'FIRE_CANNON_SUCCESS'
// try firing it again!
export const FIRE_CANNON_FAILURE = 'FIRE_CANNON_FAILURE'
// oh blimey, we got hit! Retaliate!
export const RECEIVE_HIT = 'RECEIVE_HIT'
// wow that was close, fire back while they're reloading!
export const RECEIVE_MISS = 'RECEIVE_MISS'
// yay, all ships are down, go brag about it!
export const RECEIVE_VICTORY = 'RECEIVE_VICTORY'
// oh well… maybe next time?
export const RECEIVE_DEFEAT = 'RECEIVE_DEFEAT'

// because some of us got a social life
export const PAUSE_GAME_REQUESTED = 'PAUSE_GAME_REQUESTED'
export const PAUSE_GAME_SUCCESS = 'PAUSE_GAME_SUCCESS'
export const PAUSE_GAME_FAILURE = 'PAUSE_GAME_FAILURE'
export const RECEIVE_GAME_PAUSE = 'RECEIVE_GAME_PAUSE'
export const RESUME_GAME_REQUESTED = 'RESUME_GAME_REQUESTED'
export const RESUME_GAME_SUCCESS = 'RESUME_GAME_SUCCESS'
export const RESUME_GAME_FAILURE = 'RESUME_GAME_FAILURE'
export const RECEIVE_GAME_RESUME = 'RECEIVE_GAME_RESUME'
// some of your friends may be quitters
export const LEAVE_GAME_REQUESTED = 'LEAVE_GAME_REQUESTED'
export const LEAVE_GAME_SUCCESS = 'LEAVE_GAME_SUCCESS'
export const LEAVE_GAME_FAILURE = 'LEAVE_GAME_FAILURE'
export const RECEIVE_GAME_LEAVE = 'RECEIVE_GAME_LEAVE'
