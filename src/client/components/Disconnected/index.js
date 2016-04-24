import { PropTypes, Component } from 'react'
import DocumentTitle from 'react-document-title'
import TimeAgo from 'react-timeago'
import cx from './style.scss'

const timeAgoFormatter = (value, unit, suffix) => {
  if (suffix === 'ago' || value === 0) {
    return 'Reconnecting…'
  }

  if (value !== 1) {
    unit += 's'
  }

  return `Reconnect in ${value} ${unit}…`
}

function getTimeAgo(pendingReconnect = false) {
  if (!pendingReconnect) return false

  return <TimeAgo date={pendingReconnect} formatter={timeAgoFormatter} />
}

class Disconnected extends Component {

  handleRetry = () => location.reload()

  render() {

    const { username, connected, pendingReconnect } = this.props

    const title = 'Service Unavailable'
    const failedConnect = 'Try reloading the page in a few moments'
    const lostConnection = <a onClick={this.handleRetry} className={cx('retry')}>Retry?</a>
    const afterTooManyAttempts = connected ? lostConnection : failedConnect

    return (<DocumentTitle title={`Epic | ${title}`}>
      <section className={cx('hero')}>
        <div className={cx('heroContent')}>
          <div className={cx('container')}>
            <h1 className={cx('title')}>{title}</h1>
            <h2 className={cx('subtitle')}>
              {pendingReconnect && getTimeAgo(pendingReconnect) || afterTooManyAttempts}
            </h2>
          </div>
        </div>
      </section>
    </DocumentTitle>)
  }
}
Disconnected.propTypes = {
  username: PropTypes.string,
  connected: PropTypes.bool.isRequired,
}

export default Disconnected
