import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from './style.scss'
import FriendRow from './FriendRow'

class Dashboard extends Component {
  static propTypes = {
    fetchFriends: PropTypes.func.isRequired,
    friends: PropTypes.array.isRequired,
    friendsTotal: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { friends, friendsTotal, fetchFriends } = this.props

    if (friends.size !== friendsTotal) {
      fetchFriends()
    }
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const {
      friends,
      friendsTotal,
      dispatch,
    } = this.props

    return (<section className={cx('section')}>
      {!friendsTotal && <h3>{'Nobody here yet but you!'}</h3>}
      <table className={cx('users')}>
        <thead>
          <tr>
            <th colSpan={3}>{`${friendsTotal} Online friends`}</th>
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
