import Avatar from 'react-user-avatar'
import ImmutablePropTypes from 'react-immutable-proptypes'
import TimeAgo from 'react-timeago'
import { Component } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'

const defaultColors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d'
]

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = 'monh' === unit ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

class Friend extends Component {

  static propTypes = {
    // @TODO use mapContains to validate friend data shape
    friend: ImmutablePropTypes.map.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { friend } = this.props
    const username = friend.get('username')
    const avatar = friend.get('avatar')
    const id = friend.get('id')
    const online = '1' === friend.get('online')
    return (<Link to={`/setup/${id}`} className={cx('friend')}>
      <span className={cx(online ? 'avatarOnline' : 'avatar')}>
        <Avatar colors={defaultColors} size="39" name={username} src={avatar} />
      </span>
      <span className={cx('username')}>
        {friend.get('username')}
        {friend.has('description') && <small>{friend.get('description')}</small>}
        {!online && friend.get('lastVisit', false) && <small>
          <TimeAgo date={friend.get('lastVisit')} formatter={timeAgoFormatter} />
        </small>}
      </span>
      <span className={cx('startGame')}>{'❯'}</span>
    </Link>)
  }
}

export default Friend
