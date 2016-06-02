import ImmutablePropTypes from 'react-immutable-proptypes'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TimeAgo from 'react-timeago'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import {
  gameInvite,
  acceptGameInvite,
  declineGameInvite,
  cancelGameInvite,
  newGame,
} from '../../actions'

const transitionName = Object.freeze({
  enter: cx('enter'),
  enterActive: cx('enterActive'),
  leave: cx('leave'),
  leaveActive: cx('leaveActive'),
})

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = 'month' === unit ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

const CAN_LAUNCH_GAME = 'CAN_LAUNCH_GAME'
const CAN_ACCEPT_INVITE = 'CAN_ACCEPT_INVITE'
const CAN_CANCEL_PENDING = 'CAN_CANCEL_PENDING'
const CAN_INVITE_FRIEND = 'CAN_INVITE_FRIEND'

const getLocalState = (inviteOut, inviteIn) => {
  if (inviteOut && inviteIn) {
    return CAN_LAUNCH_GAME
  }
  if (!inviteOut && inviteIn) {
    return CAN_ACCEPT_INVITE
  }
  if (inviteOut && !inviteIn) {
    return CAN_CANCEL_PENDING
  }

  return CAN_INVITE_FRIEND
}

class FriendRow extends Component {
  static propTypes = {
    friend: ImmutablePropTypes.mapContains({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      inviteIn: PropTypes.bool.isRequired,
      inviteOut: PropTypes.bool.isRequired,
      online: PropTypes.bool.isRequired,
      // @TODO custom validator for JSON datetime strings, or transform to Date in reducer/selector
      lastVisit: PropTypes.string.isRequired,
    }).isRequired,
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
    default:
      return false
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
    default:
      return false
    }
  };
  render() {
    // @FIXME should use immutable getters, not toJS
    const { username, inviteIn, inviteOut, online, lastVisit } = this.props.friend.toJS()
    const { handleYes, handleNo } = this

    const localState = getLocalState(inviteOut, inviteIn)
    const canLaunchGame = localState === CAN_LAUNCH_GAME
    const canAcceptInvite = localState === CAN_ACCEPT_INVITE
    const canCancelPending = localState === CAN_CANCEL_PENDING
    const canInviteFriend = localState === CAN_INVITE_FRIEND

    return <tr className={cx({ online })}>
      <td className={cx('username')}>{username}</td>
      <td
        className={cx('1' === online ? 'onlineStatus' : 'lastVisit')}
        title={lastVisit && new Date(lastVisit).toLocaleString()}
      >
        {lastVisit && <TimeAgo date={lastVisit} formatter={timeAgoFormatter} /> || '&bull;'}
      </td>
      <td className={cx('controlGroup')}>
        <div className={cx('buttonGroup')}>
          {canLaunchGame &&
            <Link
              className={cx('canLaunchGame')}
              to={'/game/1'}
            >
              <span>{'Start Game!'}</span>
            </Link>}
          {!canLaunchGame &&
            <button
              className={cx({
                canLaunchGame,
                canAcceptInvite,
                canCancelPending,
                canInviteFriend,
              })}
              onClick={handleYes}
            >
              <ReactCSSTransitionGroup
                transitionName={transitionName}
                transitionEnterTimeout={150}
                transitionLeaveTimeout={150}
              >
                {canLaunchGame && <span>{'Start Game!'}</span>}
                {canAcceptInvite && <span>{'Accept'}</span>}
                {canCancelPending && <span>{'Pending'}</span>}
                {canInviteFriend && <span>{'Invite'}</span>}
              </ReactCSSTransitionGroup>
            </button>}
          <button
            onClick={handleNo}
            className={cx(
              'canSayNo', { buttonDisabled: canLaunchGame || canInviteFriend }
            )}
          ><strong>{'&times;'}</strong></button>
        </div>
      </td>
    </tr>
  }
}

export default FriendRow
