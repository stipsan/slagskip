import cx from 'classnames'
import DocumentTitle from 'react-document-title'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import Friend from './Friend'
import Navbar from '../Navbar'

class NewGame extends Component {
  static propTypes = {
    bots: ImmutablePropTypes.list.isRequired,
    fetchFriends: PropTypes.func.isRequired,
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
      bots,
    } = this.props

    const friendsOnline = friends.filter(friend => '1' === friend.get('online'))
    const friendsOnlineTotal = friendsOnline.size
    const friendsOffline = friends.filter(friend => '1' !== friend.get('online'))
    const friendsOfflineTotal = friendsOffline.size

    const navbarLeft = (
      <div className="uk-navbar-content">
        <Link to="/" className="uk-button uk-button-link">
          {'❮'} <span className={cx('buttonLabel')}>{'Back'}</span>
        </Link>
      </div>
    )

    return (<DocumentTitle title="Epic | New game">
      <section>
        <Navbar left={navbarLeft}>
          {'Select your opponent'}
        </Navbar>
        <div className="uk-container uk-container-center">
          <h4 className={cx('heading')}>{'Bots'}</h4>
          {bots.toArray().map(bot => <Friend key={bot.get('id')} friend={bot} />)}
        </div>
        {0 < friendsOnlineTotal && <div className="uk-container uk-container-center">
          <h4 className={cx('heading')}>{'Online'}</h4>
          {friendsOnline.toArray().map(friend => <Friend key={friend.get('id')} friend={friend} />)}
        </div>}
        {0 < friendsOfflineTotal && <div className="uk-container uk-container-center">
          <h4 className={cx('heading')}>{'Friends'}</h4>
          {friendsOffline.toArray().map(away => <Friend key={away.get('id')} friend={away} />)}
        </div>}
      </section>
    </DocumentTitle>)
  }
}

export default NewGame
