import { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import style from './style.scss'
import Friend from './Friend'

class NewGame extends Component {
  static propTypes = {
    friends: ImmutablePropTypes.orderedMap.isRequired,
    friendsTotal: PropTypes.number.isRequired,
  }
  
  componentDidMount() {
    const { friends, friendsTotal, fetchFriends } = this.props

    if(friends.size !== friendsTotal) {
      fetchFriends()
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.friendsTotal !== this.props.friendsTotal) {
      nextProps.fetchFriends()
    }
  }
  
  render() {
    const {
      friends,
      friendsTotal,
    } = this.props
    
    const friendsOnline = friends.filter(friend => friend.get('online') === '1')
    const friendsOnlineTotal = friendsOnline.size
    const friendsOffline = friends.filter(friend => friend.get('online') !== '1')
    const friendsOfflineTotal = friendsOffline.size

    return <DocumentTitle title="Epic | New game">
      <section>
        <header className={style.header}>
          <div className={style.headerLeft}>
            <Link to="/" className={style.linkToPrevous}>❮ Back</Link>
          </div>
          <div className={style.headerCenter}>
            <h1 className={style.headerTitle}>Select your opponent</h1>
          </div>
          <div className={style.headerRight}>
            <span className={style.headerMenu}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </header>
        {friendsOnlineTotal > 0 && <div className={style.onlineContainer}>
          <h4 className={style.heading}>Online</h4>
          {friendsOnline.toArray().map(friend => <Friend key={friend.get('id')} friend={friend} />)}
        </div>}
        {friendsOfflineTotal > 0 && <div className={style.friendsContainer}>
          <h4 className={style.heading}>Friends</h4>
          {friendsOffline.toArray().map(friend => <Friend key={friend.get('id')} friend={friend} />)}
        </div>}
      </section>
    </DocumentTitle>
  }
}

export default NewGame