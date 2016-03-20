import { Component, PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import FriendRow from './FriendRow'
import Logoutbar from './Logoutbar'
import { logoutUser } from '../../actions'
import {
  section as sectionClassName,
  users as usersClassName,
} from './style.scss'

class Friends extends Component {
  static propTypes = {
    friends: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
  }
  
  handleLogout = () => this.props.dispatch(logoutUser());
  render() {
    const {
      friends,
      username,
    } = this.props
    const { handleLogout } = this

    return <DocumentTitle title={username ? `${username} - Lobby` : null}>
      <section className={sectionClassName}>
        <Logoutbar username={username} handleLogout={handleLogout} />
        {!friends.size && <h3>Nobody here yet but you!</h3>}
        <table className={usersClassName}>
          <thead>
            <tr>
              <th colSpan={3}>{friends.size} Online friends</th>
            </tr>
          </thead>
          <tbody>
            {friends.map(friend => <FriendRow
              key={friend.get('username')}
              friend={friend}
            />)}
          </tbody>
        </table>
      </section>
    </DocumentTitle>
  }
}

const mapFriendsStateToProps = state => {
  const invites = state.get('invites')
  const requests = state.get('requests')
  const friends = state.get('friends')

  return friends.map(friend => {
    const username = friend.get('username')
    return friend.merge({
      invited: requests.has(username),
      pending: invites.has(username),
      online: friend.get('online', 0) * 1,
    })
  })
}

export default connect(state => {
  return {
    friends: mapFriendsStateToProps(state),
    username: state.getIn(['viewer', 'username']),
  }
})(Friends)