import { Component, PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import FriendRow from './FriendRow'
import Logoutbar from './Logoutbar'
import { logoutUser } from '../../actions'

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
      <section className="section section--lobby">
        <Logoutbar username={username} handleLogout={handleLogout} />
        {!friends.length && <h3>Nobody here yet but you!</h3>}
        <table className="users">
          <thead>
            <tr>
              <th colSpan={3}>{friends.length} Online friends</th>
            </tr>
          </thead>
          <tbody>
            {friends.map(user => <FriendRow
              key={user.username}
              id={user.id}
              username={user.username}
              invited={user.invited}
              pending={user.pending}
              online={user.online}
              lastVisit={user.lastVisit}
            />)}
          </tbody>
        </table>
      </section>
    </DocumentTitle>
  }
}

const mapFriendsStateToProps = ({
  friends,
  requests,
  invites,
}) => {
  return friends.map(friend => {
    return {...friend, invited: requests.has(friend.username), pending: invites.has(friend.username), online: friend.online * 1}
  })
}

export default connect(state => {
  return {
    friends: mapFriendsStateToProps(state),
    username: state.viewer.username,
  }
})(Friends)