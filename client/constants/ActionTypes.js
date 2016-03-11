export const SERVER_DISCONNECTED = 'SERVER_DISCONNECTED';
export const SERVER_CONNECTED = 'SERVER_CONNECTED';
export const NETWORK_OFFLINE = 'NETWORK_OFFLINE';
export const NETWORK_ONLINE = 'NETWORK_ONLINE';

// async network requests is suffixed _REQUEST, _SUCCESS or _FAILURE
// actions that respond to server sent events is prefixed RECEIVE_

// attempt login
export const USER_REQUEST = 'USER_REQUEST'
// login succeeded, payload contains friends, invities and game matches
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// during alpha everybody is friends, friends lists will come later
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
// transition to new view, show loading status, server sets up a new socket channel for the match and we join it
export const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST'
// lovely, payload will tell us if we're waiting for our friend to join'
export const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS'
// failed, allow retrying
export const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE'
// our opponent joined the game
export const RECEIVE_GAME_JOIN = 'RECEIVE_GAME_JOIN'

// actions for setting up our own battleship formation
export const ADD_SHIP = 'ADD_SHIP'
export const MOVE_SHIP = 'MOVE_SHIP'
export const ROTATE_SHIP = 'ROTATE_SHIP'
export const REMOVE_SHIP = 'REMOVE_SHIP'
export const RESET_SHIPS = 'RESET_SHIPS'
export const RANDOM_SHIPS = 'RANDOM_SHIPS'

// the opponent is ready and waiting for us to launch
export const RECEIVE_GAME_READY = 'RECEIVE_GAME_READY'
// attempting to start the game
export const START_GAME_REQUEST = 'START_GAME_REQUEST'
// payload contains who is to make the first move
export const START_GAME_SUCCESS = 'START_GAME_SUCCESS'
export const START_GAME_FAILURE = 'START_GAME_FAILURE'

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