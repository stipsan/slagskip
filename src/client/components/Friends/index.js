import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from './style.scss'
import FriendRow from './FriendRow'

class Dashboard extends Component {
  static propTypes = {
    friends: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  componentDidMount() {
    const { friends, friendsTotal, fetchFriends } = this.props

    if (friends.size !== friendsTotal) {
      fetchFriends()
    }
  }

  render() {
    const {
      friends,
      friendsTotal,
      username,
      dispatch,
    } = this.props
    const { handleLogout } = this

    return (<section className={cx('section')}>
      {!friendsTotal && <h3>Nobody here yet but you!</h3>}
      <table className={cx('users')}>
        <thead>
          <tr>
            <th colSpan={3}>{friendsTotal} Online friends</th>
          </tr>
        </thead>
        <tbody>
          {friends.map(friend =>
            <FriendRow
              key={friend.get('username')}
              friend={friend}
              dispatch={dispatch}
            />
          )}
        </tbody>
      </table>
    </section>)
  }
}

export default Dashboard
