import Push from 'push.js'

import cx from './style.scss'

const isNotificationsSupported = Push.isSupported

const Settings = () => <section className="section section--settings">
  <h3 className={cx('title')}>Notifications</h3>
  {isNotificationsSupported && (
    <a
      className={cx('activate-button')}
      onClick={() => {
        Push.create('You enabled notifications!')
      }}
    >{'Activate Notifications'}</a>
  )}
</section>

export default Settings
