import DocumentTitle from 'react-document-title'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import Friend from './Friend'
import Navbar from '../Navbar'

class NewGame extends Component {
  static propTypes = {
    friends: ImmutablePropTypes.orderedMap.isRequired,
    friendsTotal: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { friends, friendsTotal, fetchFriends } = this.props

    if (friends.size !== friendsTotal) {
      fetchFriends()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friendsTotal !== this.props.friendsTotal) {
      nextProps.fetchFriends()
    }
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const {
      friends,
      friendsTotal,
      bots,
    } = this.props

    const friendsOnline = friends.filter(friend => friend.get('online') === '1')
    const friendsOnlineTotal = friendsOnline.size
    const friendsOffline = friends.filter(friend => friend.get('online') !== '1')
    const friendsOfflineTotal = friendsOffline.size

    const navbarLeft = (<Link to="/" className={cx('linkToPrevous')}>
      ❮ <span className={cx('buttonLabel')}>Back</span>
    </Link>)

    return (<DocumentTitle title="Epic | New game">
      <section>
        <Navbar left={navbarLeft}>
          Select your opponent
        </Navbar>
        <div className={cx('container')}>
          <h4 className={cx('heading')}>Bots</h4>
          {bots.toArray().map(bot => <Friend key={bot.get('id')} friend={bot} />)}
        </div>
        {friendsOnlineTotal > 0 && <div className={cx('container')}>
          <h4 className={cx('heading')}>Online</h4>
          {friendsOnline.toArray().map(friend => <Friend key={friend.get('id')} friend={friend} />)}
        </div>}
        {friendsOfflineTotal > 0 && <div className={cx('container')}>
          <h4 className={cx('heading')}>Friends</h4>
          {friendsOffline.toArray().map(friend => <Friend key={friend.get('id')} friend={friend} />)}
        </div>}
      </section>
    </DocumentTitle>)
  }
}

export default NewGame
