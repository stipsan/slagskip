import DocumentTitle from 'react-document-title'
import TimeAgo from 'react-timeago'
import { Component, PropTypes } from 'react'

import cx from './style.scss'

const timeAgoFormatter = (value, singularUnit, suffix) => {
  if ('ago' === suffix || 0 === value) {
    return 'Reconnecting…'
  }

  const unit = 1 === value ? singularUnit : `${singularUnit}s`

  return `Reconnect in ${value} ${unit}…`
}

function getTimeAgo(pendingReconnect = false) {
  if (!pendingReconnect) return false

  return <TimeAgo date={pendingReconnect} formatter={timeAgoFormatter} />
}

export default class Disconnected extends Component {

  static propTypes = {
    connected: PropTypes.bool.isRequired,
    pendingReconnect: PropTypes.bool.isRequired,
    username: PropTypes.string,
  }

  handleRetry = () => location.reload()

  render() {

    const { connected, pendingReconnect } = this.props

    const title = 'Service Unavailable'
    const failedConnect = 'Try reloading the page in a few moments'
    const lostConnection = <a onClick={this.handleRetry} className={cx('retry')}>{'Retry?'}</a>
    const afterTooManyAttempts = connected ? lostConnection : failedConnect

    return <DocumentTitle title={`Epic | ${title}`}>
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
    </DocumentTitle>
  }
}
