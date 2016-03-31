import { Component, PropTypes } from 'react'
import className from 'classnames'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
} from '../../actions'
import {
  username as usernameClassName,
  lastVisit as lastVisitClassName,
  controlGroup as controlGroupClassName,
  onlineStatus as onlineStatusClassName,
  buttonGroup as buttonGroupClassName,
  enter,
  enterActive,
  leave,
  leaveActive,
  canLaunchGame as canLaunchGameClassName,
  canAcceptInvite as canAcceptInviteClassName,
  canCancelPending as canCancelPendingClassName,
  canCancelPendingTransition as canCancelPendingTransitionClassName,
  canInviteFriend as canInviteFriendClassName,
  canSayNo as canSayNoClassName,
  buttonDisabled as buttonDisabledClassName,
} from './style.scss'

const transitionName = Object.freeze({
  enter,
  enterActive,
  leave,
  leaveActive,
})

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = unit === 'month' ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

const CAN_LAUNCH_GAME = 'CAN_LAUNCH_GAME'
const CAN_ACCEPT_INVITE = 'CAN_ACCEPT_INVITE'
const CAN_CANCEL_PENDING = 'CAN_CANCEL_PENDING'
const CAN_INVITE_FRIEND = 'CAN_INVITE_FRIEND'

const getLocalState = (inviteOut, inviteIn) => {
  if(inviteOut && inviteIn) {
    return CAN_LAUNCH_GAME
  }
  if(!inviteOut && inviteIn) {
    return CAN_ACCEPT_INVITE
  }
  if(inviteOut && !inviteIn) {
    return CAN_CANCEL_PENDING
  }
  if(!inviteOut && !inviteIn) {
    return CAN_INVITE_FRIEND
  }
}

class FriendRow extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    inviteOut: PropTypes.bool,
    inviteIn: PropTypes.bool,
    online: PropTypes.bool,
    lastVisit: PropTypes.string,
  }
  
  shouldComponentUpdate = shouldComponentUpdate
  
  handleYes = () => {
    const {
      id,
      username,
      inviteOut,
      inviteIn,
    } = this.props.friend.toJS()
    const dispatch = this.props.dispatch
    const data = { id, username }
    
    const localState = getLocalState(inviteOut, inviteIn)
    
    switch (localState) {
    case CAN_LAUNCH_GAME:
      return dispatch(newGame(data))
    case CAN_ACCEPT_INVITE:
      return dispatch(acceptGameInvite(data))
    case CAN_INVITE_FRIEND:
      return dispatch(gameInvite(data))
    }
  }
  handleNo = () => {
    const {
      id,
      username,
      inviteOut,
      inviteIn,
    } = this.props.friend.toJS()
    const dispatch = this.props.dispatch
    const data = { id, username }
    
    const localState = getLocalState(inviteOut, inviteIn)
    
    switch (localState) {
    case CAN_CANCEL_PENDING:
      return dispatch(cancelGameInvite(data))
    case CAN_ACCEPT_INVITE:
      return dispatch(declineGameInvite(data))
    }
  };
  render() {
    // @FIXME
    const { username, inviteIn, inviteOut, online, lastVisit } = this.props.friend.toJS()
    const { handleYes, handleNo } = this
 
    const localState = getLocalState(inviteOut, inviteIn)
    const canLaunchGame = localState === CAN_LAUNCH_GAME
    const canAcceptInvite = localState === CAN_ACCEPT_INVITE
    const canCancelPending = localState === CAN_CANCEL_PENDING
    const canInviteFriend = localState === CAN_INVITE_FRIEND
 
    return <tr className={className({  online })}>
      <td className={usernameClassName}>{username}</td>
      {
        online === '1' && 
        <td className={onlineStatusClassName}>&bull;</td> ||
        <td className={lastVisitClassName}
            title={lastVisit && new Date(lastVisit).toLocaleString()}
        >{lastVisit && <TimeAgo date={lastVisit} formatter={timeAgoFormatter} />}</td>
      }
      <td className={controlGroupClassName}>
      <div className={buttonGroupClassName}>
        {canLaunchGame && <Link
          className={canLaunchGameClassName}
          to={`game/1`}
        >
          <span>Start Game!</span>
        </Link>}
        {!canLaunchGame && <button className={className({
          [canLaunchGameClassName]: canLaunchGame,
          [canAcceptInviteClassName]: canAcceptInvite,
          [canAcceptInviteClassName]: canAcceptInvite,
          [canCancelPendingClassName]: canCancelPending,
          [canInviteFriendClassName]: canInviteFriend,
        })} onClick={handleYes}>
          <ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={150} transitionLeaveTimeout={150}>
            {canLaunchGame && <span>Start Game!</span>}
            {canAcceptInvite && <span>Accept</span>}
            {canCancelPending && <span className={canCancelPendingTransitionClassName}>Pending</span>}
            {canInviteFriend && <span>Invite</span>}
          </ReactCSSTransitionGroup>
        </button>}
        <button onClick={handleNo} className={className(
          canSayNoClassName, {[buttonDisabledClassName]: canLaunchGame || canInviteFriend}
        )}><strong>&times;</strong></button>
        </div>
      </td>
    </tr>
  }
}

export default FriendRow