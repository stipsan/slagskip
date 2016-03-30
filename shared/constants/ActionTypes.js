// async network requests is suffixed _REQUEST, _SUCCESS or _FAILURE
// actions that respond to server sent events is prefixed RECEIVE_

export const CHECK_CAPABILITIES = 'CHECK_CAPABILITIES'

// client local network status (client to router)
// @TODO add network middleware that dispatch these
export const RECEIVE_NETWORK_OFFLINE = 'RECEIVE_NETWORK_OFFLINE'
export const RECEIVE_NETWORK_ONLINE = 'RECEIVE_NETWORK_ONLINE'

// attempting to connect SocketCluster to server
export const SOCKET_REQUEST = 'SOCKET_REQUEST'
// socket connected successfully
export const SOCKET_SUCCESS = 'SOCKET_SUCCESS'
// socket got disconnected, or maybe the user got bandwidth capped, a firewall
// blocks the websocket but is letting http requests come through, etc.
export const SOCKET_FAILURE = 'SOCKET_FAILURE'
export const SOCKET_ERROR = 'SOCKET_ERROR'
// allow manual trigger of reconnect w/o full page reload or waiting for timeout
export const SOCKET_RECONNECT = 'SOCKET_RECONNECT'
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT'

// attempt login
export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST'
// login succeeded, payload contains friends, invities and game matches
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE'
// we got a valid authentication and don't need to login
export const RECEIVE_VIEWER = 'RECEIVE_VIEWER'
export const RECEIVE_AUTH_STATE_CHANGE = 'RECEIVE_AUTH_STATE_CHANGE'
export const RECEIVE_AUTHENTICATE = 'RECEIVE_AUTHENTICATE'
// attempt logout
export const DEAUTHENTICATE_REQUEST = 'DEAUTHENTICATE_REQUEST'
export const DEAUTHENTICATE_SUCCESS = 'DEAUTHENTICATE_SUCCESS'
export const DEAUTHENTICATE_FAILURE = 'DEAUTHENTICATE_FAILURE'
export const RECEIVE_DEAUTHENTICATE = 'RECEIVE_DEAUTHENTICATE'

// setup private and public service channel subs
export const SUBSCRIBE_CHANNEL_REQUEST = 'SUBSCRIBE_CHANNEL_REQUEST'
export const SUBSCRIBE_CHANNEL_SUCCESS = 'SUBSCRIBE_CHANNEL_SUCCESS'
export const SUBSCRIBE_CHANNEL_FAILURE = 'SUBSCRIBE_CHANNEL_FAILURE'
export const RECEIVE_SUBSCRIBE_STATE_CHANGE = 'RECEIVE_SUBSCRIBE_STATE_CHANGE'
export const RECEIVE_UNSUBSCRIBE_CHANNEL = 'RECEIVE_UNSUBSCRIBE_CHANNEL'
export const RECEIVE_KICK_OUT = 'RECEIVE_KICK_OUT'

// during alpha everybody is friends, friends lists will come later
export const FRIENDS_REQUEST = 'FRIENDS_REQUEST'
export const FRIENDS_SUCCESS = 'FRIENDS_SUCCESS'
export const FRIENDS_FAILURE = 'FRIENDS_FAILURE'
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND'
// user came online or disconnected/signed out
export const RECEIVE_FRIEND_NETWORK_STATUS = 'RECEIVE_FRIEND_NETWORK_STATUS'
// friend got kicked or deleted their own account
export const RECEIVE_FRIEND_DELETED = 'RECEIVE_FRIEND_DELETED'

// send the invite to a friend, show spinner
export const GAME_INVITE_REQUEST = 'GAME_INVITE_REQUEST'
// friend received invite, show pending response label
export const GAME_INVITE_SUCCESS = 'GAME_INVITE_SUCCESS'
// failed to send it, retry?
export const GAME_INVITE_FAILURE = 'GAME_INVITE_FAILURE'
// notify a friend wants to play, allow notification to respond,
// additionally show accept/decline buttons in lobby friends list
export const RECEIVE_GAME_INVITE = 'RECEIVE_GAME_INVITE'
export const DECLINE_GAME_INVITE_REQUEST = 'DECLINE_GAME_INVITE_REQUEST'
export const DECLINE_GAME_INVITE_SUCCESS = 'DECLINE_GAME_INVITE_SUCCESS'
export const DECLINE_GAME_INVITE_FAILURE = 'DECLINE_GAME_INVITE_FAILURE'
export const RECEIVE_GAME_INVITE_DECLINED = 'RECEIVE_GAME_INVITE_DECLINED'
export const ACCEPT_GAME_INVITE_REQUEST = 'ACCEPT_GAME_INVITE_REQUEST'
// two friends wants to play, show button for launching the match
export const ACCEPT_GAME_INVITE_SUCCESS = 'ACCEPT_GAME_INVITE_SUCCESS'
export const ACCEPT_GAME_INVITE_FAILURE = 'ACCEPT_GAME_INVITE_FAILURE'
// same as ACCEPT_GAME_INVITE_SUCCESS
export const RECEIVE_GAME_INVITE_ACCEPTED = 'RECEIVE_GAME_INVITE_ACCEPTED'
export const CANCEL_GAME_INVITE_REQUEST = 'CANCEL_GAME_INVITE_REQUEST'
export const CANCEL_GAME_INVITE_SUCCESS = 'CANCEL_GAME_INVITE_SUCCESS'
export const CANCEL_GAME_INVITE_FAILURE = 'CANCEL_GAME_INVITE_FAILURE'
export const RECEIVE_GAME_INVITE_CANCELLED = 'RECEIVE_GAME_INVITE_CANCELLED'
// transition to new view, show loading status, server sets up a new socket channel for the match and we join it
export const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST'
// lovely, payload will tell us if we're waiting for our friend to join'
export const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS'
// failed, allow retrying
export const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE'
// our opponent joined the game
export const RECEIVE_GAME_JOIN = 'RECEIVE_GAME_JOIN'

// actions for setting up our own battleship formation
export const ADD_ITEM = 'ADD_ITEM'
export const MOVE_ITEM = 'MOVE_ITEM'
export const ROTATE_ITEM = 'ROTATE_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const RESET_ITEMS = 'RESET_ITEMS'
export const LOAD_ITEMS = 'LOAD_ITEMS'

// attempting to start the game
export const LOAD_GAME_REQUEST = 'LOAD_GAME_REQUEST'
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
export const FIRE_CANNON_REQUEST = 'FIRE_CANNON_REQUEST'
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
export const PAUSE_GAME_REQUEST = 'PAUSE_GAME_REQUEST'
export const PAUSE_GAME_SUCCESS = 'PAUSE_GAME_SUCCESS'
export const PAUSE_GAME_FAILURE = 'PAUSE_GAME_FAILURE'
export const RECEIVE_GAME_PAUSE = 'RECEIVE_GAME_PAUSE'
export const RESUME_GAME_REQUEST = 'RESUME_GAME_REQUEST'
export const RESUME_GAME_SUCCESS = 'RESUME_GAME_SUCCESS'
export const RESUME_GAME_FAILURE = 'RESUME_GAME_FAILURE'
export const RECEIVE_GAME_RESUME = 'RECEIVE_GAME_RESUME'
// some of your friends may be quitters
export const LEAVE_GAME_REQUEST = 'LEAVE_GAME_REQUEST'
export const LEAVE_GAME_SUCCESS = 'LEAVE_GAME_SUCCESS'
export const LEAVE_GAME_FAILURE = 'LEAVE_GAME_FAILURE'
export const RECEIVE_GAME_LEAVE = 'RECEIVE_GAME_LEAVE'

// its sad to see them go, but we have to let them
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'