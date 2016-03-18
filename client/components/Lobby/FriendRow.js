import { Component } from 'react'
import { connect } from 'react-redux'
import className from 'classnames'
import TimeAgo from 'react-timeago'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  newGame,
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
} from '../../actions'

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = unit === 'month' ? 'M' : unit.slice(0, 1)
  return `${value}${formattedUnit}`
}

const CAN_LAUNCH_GAME = 'CAN_LAUNCH_GAME'
const CAN_ACCEPT_INVITE = 'CAN_ACCEPT_INVITE'
const CAN_CANCEL_PENDING = 'CAN_CANCEL_PENDING'
const CAN_INVITE_FRIEND = 'CAN_INVITE_FRIEND'

const getLocalState = (invited, pending) => {
  if(invited && pending) {
    return CAN_LAUNCH_GAME
  }
  if(!invited && pending) {
    return CAN_ACCEPT_INVITE
  }
  if(invited && !pending) {
    return CAN_CANCEL_PENDING
  }
  if(!invited && !pending) {
    return CAN_INVITE_FRIEND
  }
}
const compareLocalState = (state, compare, ifSuccess, ifFalse = false) =>
  state === compare ? ifSuccess : ifFalse

class FriendRow extends Component {
  handleYes = event => {
    const {
      id,
      username,
      invited,
      pending,
      dispatch,
    } = this.props
    const data = { id, username }
    
    const localState = getLocalState(invited, pending)
    
    switch (localState) {
      case CAN_LAUNCH_GAME:
        return dispatch(newGame(data))
      case CAN_ACCEPT_INVITE:
        return dispatch(acceptGameInvite(data))
      case CAN_INVITE_FRIEND:
        return dispatch(gameInvite(data))
    }
  }
  handleNo = event => {
    const {
      id,
      username,
      invited,
      pending,
      dispatch,
    } = this.props
    const data = { id, username }
    
    const localState = getLocalState(invited, pending)
    
    switch (localState) {
      case CAN_CANCEL_PENDING:
        return dispatch(cancelGameInvite(data))
      case CAN_ACCEPT_INVITE:
        return dispatch(declineGameInvite(data))
    }
  };
  render() {
    const { username, pending, invited, online, lastVisit } = this.props
    const { handleYes, handleNo } = this
 
    const localState = getLocalState(invited, pending)
    const canLaunchGame = localState === CAN_LAUNCH_GAME
    const canAcceptInvite = localState === CAN_ACCEPT_INVITE
    const canCancelPending = localState === CAN_CANCEL_PENDING
    const canInviteFriend = localState === CAN_INVITE_FRIEND
    
 
    return <tr className={className({ online })}>
      <td className="user-name">{username}</td>
      {
        online && 
        <td className="online-status">&bull;</td> ||
        <td className="last-visit"
            title={lastVisit && new Date(lastVisit).toLocaleString()}
        >{lastVisit && <TimeAgo date={lastVisit} formatter={timeAgoFormatter} />}</td>
      }
      <td className="control-group">
      <div>
        <button className={className('btn', {
          'btn-primary': canLaunchGame,
          'btn-accept': canAcceptInvite,
          'btn-pending': canCancelPending,
          'btn-invite': canInviteFriend,
        })} onClick={handleYes}>
          <ReactCSSTransitionGroup transitionName="button-label" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
            {canLaunchGame && <span>Start Game!</span>}
            {canAcceptInvite && <span>Accept</span>}
            {canCancelPending && <span className="progress-letters">
              {'Pending'.split('').map((letter, index) => <span key={index}>{letter}</span>)}
            </span>}
            {canInviteFriend && <span>Invite</span>}
          </ReactCSSTransitionGroup>
        </button>
        <button onClick={handleNo} className={className(
          'btn btn-decline', {'btn-disabled': canLaunchGame || canInviteFriend}
        )}><strong>&times;</strong></button>
        </div>
      </td>
    </tr>
  }
}

export default connect()(FriendRow)